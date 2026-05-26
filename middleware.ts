import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth gate for /admin/* routes. Credentials come from
 * Vercel environment variables ADMIN_USER and ADMIN_PASSWORD so
 * nothing sensitive lives in git.
 *
 * Lives at the project root (not src/) per Next.js convention.
 * Runs on the Edge — so we use atob() rather than Buffer.
 */

export function middleware(req: NextRequest) {
  const requiredUser = process.env.ADMIN_USER;
  const requiredPass = process.env.ADMIN_PASSWORD;

  // Safety: if env vars aren't set, refuse access entirely rather
  // than letting an unauthenticated visitor through.
  if (!requiredUser || !requiredPass) {
    return new NextResponse(
      "Admin credentials are not configured. Set ADMIN_USER and ADMIN_PASSWORD in Vercel environment variables.",
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return unauthorized();
  }

  let user = "";
  let pass = "";
  try {
    const decoded = atob(auth.slice(6));
    const idx = decoded.indexOf(":");
    user = decoded.slice(0, idx);
    pass = decoded.slice(idx + 1);
  } catch {
    return unauthorized();
  }

  if (user !== requiredUser || pass !== requiredPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="JaloGames Admin"',
    },
  });
}

export const config = {
  // Protect everything under /admin. The API route lives inside
  // server actions so we don't need a separate matcher for it —
  // and even if we did, the page itself is gated, which means the
  // action can only be triggered by an authenticated browser.
  matcher: ["/admin/:path*"],
};
