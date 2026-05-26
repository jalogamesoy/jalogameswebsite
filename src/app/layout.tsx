import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Russo_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { RevealController } from "@/components/fx/RevealController";
import { SITE_CONFIG, SITE_URL } from "@/lib/site";
import { social, studio } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Russo One — single weight (400, visually heavy by default). Closer
// to the reference's Eurostile/Bank Gothic feel than Saira was.
const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const TITLE_DEFAULT = `${SITE_CONFIG.name} — Next-Generation Game Studio from Finland`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: studio.tagline,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_URL }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  // Per-page metadata sets its own alternates.canonical. Root only
  // provides metadataBase; canonical defaults to the current path so
  // /games gets canonical /games, /games/ramba-bull gets its own, etc.
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title: TITLE_DEFAULT,
    description: studio.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: studio.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "games",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b1f",
  colorScheme: "dark",
};

/** Organization JSON-LD — every page inherits this via the root layout.
 *  `sameAs` carries our verified external profiles, which is one of the
 *  strongest signals AI search engines use to confirm a brand's identity. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  alternateName: "Jalo Games",
  url: SITE_URL,
  description: studio.tagline,
  foundingDate: String(studio.foundingYear),
  email: studio.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  sameAs: social.map((s) => s.href),
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${russoOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* Phase 3A motion FX. Each component is a no-DOM client effect
            (Lenis, IO controller) or renders a fixed-position layer
            (cursor). All respect prefers-reduced-motion internally. */}
        <SmoothScroll />
        <RevealController />
        <Cursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
