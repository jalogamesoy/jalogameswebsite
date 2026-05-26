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
};

export type PlatformResult = {
  success: boolean;
  url?: string;
  postId?: string;
  error?: string;
};

export type PublishResult = {
  linkedin?: PlatformResult;
  x?: PlatformResult;
  reddit?: PlatformResult;
  /** Cumulative usage from the last call we made. */
  usage?: { count: number; limit: number };
};

const ENDPOINT = "https://api.upload-post.com/api/upload_text";

type RawApiResponse = {
  success: boolean;
  message?: string;
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

async function callApi(form: URLSearchParams): Promise<RawApiResponse> {
  const apiKey = process.env.UPLOAD_POST_KEY;
  if (!apiKey) {
    throw new Error(
      "UPLOAD_POST_KEY environment variable is not set. Add it in Vercel project settings."
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Apikey ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
    cache: "no-store",
  });

  return (await res.json()) as RawApiResponse;
}

function extractResult(
  res: RawApiResponse,
  platform: "linkedin" | "x" | "reddit"
): PlatformResult {
  if (!res.success && !res.results?.[platform]) {
    return { success: false, error: res.message ?? "unknown error" };
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

  if (input.linkedin) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "linkedin");
    // For LinkedIn text-only posts, upload-post renders the `title`
    // field as the post body. Newlines in title survive the
    // form-urlencoding (they're encoded as %0A) and render as
    // multi-paragraph on LinkedIn.
    form.append("title", input.linkedin.body);
    const res = await callApi(form);
    result.linkedin = extractResult(res, "linkedin");
    if (res.usage) result.usage = res.usage;
  }

  if (input.x) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "x");
    // X is title-only (each char counts toward the 280 limit).
    form.append("title", input.x.body);
    const res = await callApi(form);
    result.x = extractResult(res, "x");
    if (res.usage) result.usage = res.usage;
  }

  if (input.reddit) {
    const form = new URLSearchParams();
    form.append("user", input.user);
    form.append("platform[]", "reddit");
    form.append("title", input.reddit.title);
    form.append("description", input.reddit.body);
    form.append("subreddit", input.reddit.subreddit.replace(/^r\//, ""));
    const res = await callApi(form);
    result.reddit = extractResult(res, "reddit");
    if (res.usage) result.usage = res.usage;
  }

  return result;
}
