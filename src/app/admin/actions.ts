"use server";

import {
  publishToSocials,
  listScheduledPosts,
  cancelScheduledPost,
  type PublishResult,
  type ScheduledPost,
} from "@/lib/upload-post";

export type Platform = "linkedin" | "x" | "reddit";

/**
 * Shared input shape for the social composer (used by the standalone
 * /admin/compose page and the per-journal-post /admin/publish page).
 *
 * When `scheduledDate` is set (an absolute UTC ISO instant the client
 * computed from the admin's local time), every selected platform is
 * SCHEDULED with upload-post instead of posted immediately.
 */
export type ComposerInput = {
  platforms: Platform[];
  linkedinText: string;
  xText: string;
  redditTitle: string;
  redditBody: string;
  subreddit: string;
  scheduledDate?: string;
  timezone?: string;
};

// upload-post profile username (visible at /api/uploadposts/users).
const UPLOAD_POST_USER = "Jalo";

function errorForAll(platforms: Platform[], msg: string): PublishResult {
  const r: PublishResult = {};
  if (platforms.includes("linkedin")) r.linkedin = { success: false, error: msg };
  if (platforms.includes("x")) r.x = { success: false, error: msg };
  if (platforms.includes("reddit")) r.reddit = { success: false, error: msg };
  return r;
}

/**
 * Post now, or schedule, to the selected platforms. Runs only inside the
 * middleware-protected /admin route, so it's implicitly auth-gated (you
 * can't fire a server action without an authenticated session).
 *
 * Fires one upload-post call per platform so each gets the field mapping
 * it needs (see src/lib/upload-post.ts for why a combined call fails for
 * LinkedIn). Each platform also schedules independently.
 */
export async function submitPost(input: ComposerInput): Promise<PublishResult> {
  if (input.platforms.length === 0) return {};

  if (input.platforms.includes("reddit") && !input.subreddit.trim()) {
    return {
      reddit: {
        success: false,
        error: "Reddit needs a subreddit. Pass the name without r/.",
      },
    };
  }

  // Belt-and-suspenders future-date guard (the client validates too, and
  // upload-post enforces ≤365 days, but fail fast before the API call).
  if (input.scheduledDate) {
    const t = Date.parse(input.scheduledDate);
    if (Number.isNaN(t)) {
      return errorForAll(input.platforms, "Invalid scheduled date.");
    }
    if (t <= Date.now()) {
      return errorForAll(input.platforms, "Scheduled time must be in the future.");
    }
  }

  return publishToSocials({
    user: UPLOAD_POST_USER,
    linkedin: input.platforms.includes("linkedin")
      ? { body: input.linkedinText }
      : undefined,
    x: input.platforms.includes("x") ? { body: input.xText } : undefined,
    reddit: input.platforms.includes("reddit")
      ? {
          title: input.redditTitle,
          body: input.redditBody,
          subreddit: input.subreddit,
        }
      : undefined,
    scheduledDate: input.scheduledDate,
    timezone: input.timezone,
  });
}

/** Fetch the pending scheduled-post queue from upload-post. */
export async function listScheduled(): Promise<ScheduledPost[]> {
  return listScheduledPosts();
}

/** Cancel one scheduled post by its upload-post job id. */
export async function cancelScheduled(
  jobId: string
): Promise<{ success: boolean; error?: string }> {
  if (!jobId) return { success: false, error: "missing job id" };
  return cancelScheduledPost(jobId);
}
