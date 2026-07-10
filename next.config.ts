import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The site is a single page now. Old sections that were shared or
    // indexed (journal posts, game pages, press kit) land home instead
    // of 404ing.
    const gone = [
      "/games/:path*",
      "/journal/:path*",
      "/admin/:path*",
      "/press",
      "/studio",
      "/careers",
      "/contact",
      "/faq",
      "/privacy",
      "/terms",
      "/llms-full.txt",
    ];
    return gone.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
