"use server";

import {
  publishToSocials,
  type UploadPostPlatform,
  type UploadPostResult,
} from "@/lib/upload-post";

export type PublishInput = {
  platforms: UploadPostPlatform[];
  redditTitle: string;
  redditBody: string;
  linkedinText: string;
  xText: string;
  subreddit: string;
};

/**
 * Server action invoked by the PublishForm. Runs only inside the
 * middleware-protected /admin route so this is implicitly auth-gated
 * (you can't fire a server action without an authenticated client
 * session).
 */
export async function publishAction(
  input: PublishInput
): Promise<UploadPostResult> {
  if (input.platforms.length === 0) {
    return {
      success: false,
      message: "Pick at least one platform before publishing.",
    };
  }

  if (input.platforms.includes("reddit") && !input.subreddit.trim()) {
    return {
      success: false,
      message: "Reddit needs a subreddit. Pass the name without r/.",
    };
  }

  return publishToSocials({
    // upload-post user identifier. Hardcoded for now — there's only
    // one profile on the account ("Jalo"). If you ever add more
    // profiles, lift this to an env var or page prop.
    user: "Jalo",
    platforms: input.platforms,
    title: input.redditTitle,
    description: input.redditBody,
    linkedinDescription: input.linkedinText,
    xTitle: input.xText,
    subreddit: input.subreddit.replace(/^r\//, ""),
  });
}
