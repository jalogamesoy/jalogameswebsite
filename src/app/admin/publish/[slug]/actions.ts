"use server";

import {
  publishToSocials,
  type PublishResult,
} from "@/lib/upload-post";

export type Platform = "linkedin" | "x" | "reddit";

export type PublishInput = {
  platforms: Platform[];
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
 *
 * Fires one upload-post API call per selected platform so each gets
 * the field mapping it actually needs (see src/lib/upload-post.ts
 * for why a single combined call doesn't work for LinkedIn).
 */
export async function publishAction(
  input: PublishInput
): Promise<PublishResult> {
  if (input.platforms.length === 0) {
    return {
      linkedin: undefined,
      x: undefined,
      reddit: undefined,
    };
  }

  if (input.platforms.includes("reddit") && !input.subreddit.trim()) {
    return {
      reddit: {
        success: false,
        error: "Reddit needs a subreddit. Pass the name without r/.",
      },
    };
  }

  return publishToSocials({
    user: "Jalo",
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
  });
}
