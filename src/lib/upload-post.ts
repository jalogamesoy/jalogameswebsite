/**
 * upload-post.com API helper. Server-side only — never import this
 * into a client component because the API key reads from process.env
 * and would leak into the client bundle.
 *
 * Lessons learned from live testing:
 * - Sending all platforms in one call DOES post to all, but the
 *   platform-specific override fields (`linkedin_description`,
 *   `x_title`) don't reliably override `title`/`description`. Result:
 *   LinkedIn ended up showing just the (short) `title` value while
 *   the intended `linkedin_description` body was silently dropped.
 * - The fix is to make ONE API call per platform with the post's
 *   actual content placed in `title` (LinkedIn + X) or
 *   `title` + `description` + `subreddit` (Reddit). This way each
 *   platform gets exactly the field structure it expects.
 * - Reddit subreddit field is literally `subreddit` (not
 *   `reddit_subreddit` as the docs suggest).
 * - Authorization header is `Apikey <token>` with a lowercase 'k'.
 *
 * Scheduling (added 2026-06):
 * - Add `scheduled_date` (ISO-8601, must be in the future, ≤ 365 days)
 *   to any upload call and upload-post holds + fires it for you. The
 *   API replies 202 Accepted with a `job_id` instead of 200 + results.
 * - We send an ABSOLUTE UTC instant (…Z), computed client-side from the
 *   admin's local time, so there is no timezone ambiguity. `timezone`
 *   is sent only as metadata for upload-post's own display.
 * - Manage the queue via GET/DELETE on /api/uploadposts/schedule.
 * - We still fire ONE call per platform, so scheduling 3 platforms
 *   creates 3 independent jobs (cancel/reschedule each on its own).
 */

export type LinkedinContent = { body: string };
export type XContent = { body: string };
export type RedditContent = {
  title: string;
  body: string;
  /** Subreddit name without the r/ prefix. */
  subreddit: string;
};

export type PublishInput = {
  /** Profile username in upload-post (visible at /api/uploadposts/users). */
  user: string;
  linkedin?: LinkedinContent;
  x?: XContent;
  reddit?: RedditContent;
  /**
   * Absolute UTC instant in ISO-8601 (e.g. "2026-06-10T06:00:00.000Z").
   * When set, every platform call is SCHEDULED instead of posted now.
   */
  scheduledDate?: string;
  /** IANA timezone (e.g. "Europe/Helsinki"), metadata for display. */
  timezone?: string;
};

export type PlatformResult = {
  success: boolean;
  url?: string;
  postId?: string;
  error?: string;
  /** True when this result represents a scheduled job, not a live post. */
  scheduled?: boolean;
  /** upload-post job id for a scheduled post (used to cancel/reschedule). */
  jobId?: string;
  /** Echoed scheduled instant (ISO-8601) when scheduled. */
  scheduledDate?: string;
};

export type PublishResult = {
  linkedin?: PlatformResult;
  x?: PlatformResult;
  reddit?: PlatformResult;
  /** Cumulative usage from the last call we made. */
  usage?: { count: number; limit: number };
};

/** A pending scheduled post as returned by the schedule list endpoint. */
export type ScheduledPost = {
  jobId: string;
  scheduledDate?: string;
  postType?: string;
  profileUsername?: string;
  title?: string;
  previewUrl?: string;
};

const ENDPOINT = "https://api.upload-post.com/api/upload_text";
const SCHEDULE_ENDPOINT = "https://api.upload-post.com/api/uploadposts/schedule";

type RawApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
  /** Present on a 202 scheduled response. */
  job_id?: string;
  scheduled_date?: string;
  results?: Record<
    string,
    {
      success: boolean;
      post_id?: string;
      url?: string;
      status?: string;
      error?: string;
    }
  >;
  usage?: { count: number; limit: number };
};

function apiKeyOrThrow(): string {
  const apiKey = process.env.UPLOAD_POST_KEY;
  if (!apiKey) {
    throw new Error(
      "UPLOAD_POST_KEY environment variable is not set. Add it in Vercel project settings."
    );
  }
  return apiKey;
}

async function callApi(form: URLSearchParams): Promise<RawApiResponse> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Apikey ${apiKeyOrThrow()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
    cache: "no-store",
  });

  return (await res.json()) as RawApiResponse;
}

/** Append scheduling fields to a platform form when a date is set. */
function applySchedule(form: URLSearchParams, input: PublishInput): boolean {
  if (!input.scheduledDate) return false;
  form.append("scheduled_date", input.scheduledDate);
  if (input.timezone) form.append("timezone", input.timezone);
  return true;
}

/** Build a per-platform result, handling both immediate (200) and
 *  scheduled (202 + job_id) responses. */
function buildResult(
  res: RawApiResponse,
  platform: "linkedin" | "x" | "reddit",
  scheduled: boolean
): PlatformResult {
  if (scheduled) {
    if (res.success && res.job_id) {
      return {
        success: true,
        scheduled: true,
        jobId: res.job_id,
        scheduledDate: res.scheduled_date,
      };
    }
    return {
      success: false,
      scheduled: true,
      error: res.message ?? res.error ?? "scheduling failed",
    };
  }

  if (!res.success && !res.results?.[platform]) {
    return { success: false, error: res.message ?? res.error ?? "unknown error" };
  }
  const r = res.results?.[platform];
  if (!r) return { success: false, error: "no result returned" };
  return {
    success: r.success,
    url: r.url,
    postId: r.post_id,
    error: r.success ? undefined : r.error ?? res.message ?? "failed",
  };
}

export async function publishToSocials(
  input: PublishInput
): Promise<PublishResult> {
  const result: PublishResult = {};
  const scheduled = !!input.scheduledDate;

  if (input.linkedin) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "linkedin");
    // For LinkedIn text-only posts, upload-post renders the `title`
    // field as the post body. Newlines in title survive the
    // form-urlencoding (they're encoded as %0A) and render as
    // multi-paragraph on LinkedIn.
    form.append("title", input.linkedin.body);
    applySchedule(form, input);
    const res = await callApi(form);
    result.linkedin = buildResult(res, "linkedin", scheduled);
    if (res.usage) result.usage = res.usage;
  }

  if (input.x) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "x");
    // X is title-only (each char counts toward the 280 limit).
    form.append("title", input.x.body);
    applySchedule(form, input);
    const res = await callApi(form);
    result.x = buildResult(res, "x", scheduled);
    if (res.usage) result.usage = res.usage;
  }

  if (input.reddit) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "reddit");
    form.append("title", input.reddit.title);
    form.append("description", input.reddit.body);
    form.append("subreddit", input.reddit.subreddit.replace(/^r\//, ""));
    applySchedule(form, input);
    const res = await callApi(form);
    result.reddit = buildResult(res, "reddit", scheduled);
    if (res.usage) result.usage = res.usage;
  }

  return result;
}

/** List all pending scheduled posts for the API key's account. */
export async function listScheduledPosts(): Promise<ScheduledPost[]> {
  const res = await fetch(SCHEDULE_ENDPOINT, {
    headers: { Authorization: `Apikey ${apiKeyOrThrow()}` },
    cache: "no-store",
  });
  if (!res.ok) return [];

  const data: unknown = await res.json().catch(() => null);
  // The endpoint returns "an array of pending jobs"; be defensive about
  // whether it's bare or wrapped.
  const wrapped = data as Record<string, unknown> | null;
  const arr = (
    Array.isArray(data)
      ? data
      : wrapped?.scheduled_posts ??
        wrapped?.jobs ??
        wrapped?.results ??
        []
  ) as Array<Record<string, unknown>>;

  return arr
    .map((j) => ({
      jobId: String(j.job_id ?? j.id ?? ""),
      scheduledDate: (j.scheduled_date as string) ?? undefined,
      postType: (j.post_type as string) ?? undefined,
      profileUsername: (j.profile_username as string) ?? undefined,
      title: (j.title as string) ?? undefined,
      previewUrl: (j.preview_url as string) ?? undefined,
    }))
    .filter((j) => j.jobId);
}

/** Cancel a single scheduled post by job id. */
export async function cancelScheduledPost(
  jobId: string
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${SCHEDULE_ENDPOINT}/${encodeURIComponent(jobId)}`, {
    method: "DELETE",
    headers: { Authorization: `Apikey ${apiKeyOrThrow()}` },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    error?: string;
  };
  if (data.success || res.ok) return { success: true };
  return { success: false, error: data.message ?? data.error ?? "cancel failed" };
}
