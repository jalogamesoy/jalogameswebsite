/**
 * upload-post.com API helper. Server-side only — never import this
 * into a client component because the API key reads from process.env
 * and would leak into the client bundle.
 *
 * Quirks we discovered from testing:
 * - Despite the docs, the Reddit subreddit param is `subreddit`
 *   (not `reddit_subreddit`).
 * - Authorization header is `Apikey <token>` with a lowercase 'k'.
 * - `platform[]` is sent as a repeated form key (PHP/Rails style).
 */

export type UploadPostPlatform = "linkedin" | "x" | "reddit";

export type UploadPostParams = {
  /** Profile username in upload-post (visible at /api/uploadposts/users). */
  user: string;
  platforms: UploadPostPlatform[];
  /** Becomes the Reddit title; also used as fallback for X/LinkedIn
   *  when no platform-specific override is provided. */
  title: string;
  /** Becomes the Reddit body; also a fallback for LinkedIn. */
  description?: string;
  /** Platform-specific override for LinkedIn post body. */
  linkedinDescription?: string;
  /** Platform-specific override for X post body (X is short-form so
   *  this often replaces the longer description entirely). */
  xTitle?: string;
  /** Required when posting to Reddit. Without the r/ prefix. */
  subreddit?: string;
};

/** Shape of the upload-post.com response (subset we use). */
export type UploadPostResult = {
  success: boolean;
  message?: string;
  results?: Record<
    string,
    {
      success: boolean;
      post_id?: string;
      url?: string;
      status?: string;
      attempts?: number;
      error?: string;
    }
  >;
  usage?: { count: number; limit: number };
  request_id?: string;
  job_id?: string;
};

const ENDPOINT = "https://api.upload-post.com/api/upload_text";

export async function publishToSocials(
  params: UploadPostParams
): Promise<UploadPostResult> {
  const apiKey = process.env.UPLOAD_POST_KEY;
  if (!apiKey) {
    throw new Error(
      "UPLOAD_POST_KEY environment variable is not set. Add it in Vercel project settings."
    );
  }

  // x-www-form-urlencoded with repeated platform[] keys.
  const form = new URLSearchParams();
  form.append("user", params.user);
  for (const p of params.platforms) form.append("platform[]", p);
  form.append("title", params.title);
  if (params.description) form.append("description", params.description);
  if (params.linkedinDescription)
    form.append("linkedin_description", params.linkedinDescription);
  if (params.xTitle) form.append("x_title", params.xTitle);
  if (params.subreddit) form.append("subreddit", params.subreddit);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Apikey ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
    // Don't cache — we want each publish call to actually hit the API.
    cache: "no-store",
  });

  const data = (await res.json()) as UploadPostResult;
  return data;
}
