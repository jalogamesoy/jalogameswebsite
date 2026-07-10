import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Cursor } from "@/components/fx/Cursor";
import { ScrollFX } from "@/components/fx/ScrollFX";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { COMPANY, EMAIL, LINKS, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${SITE_NAME} — Independent Game Studio · Helsinki`;
const DESCRIPTION =
  "Founder-led independent game studio in Helsinki, Finland. Original worlds, premium craft, built to last. Now building Grace Run.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Jalo Tuomi", url: LINKS.founderLinkedIn }],
  creator: SITE_NAME,
  publisher: COMPANY,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
  themeColor: "#0c0a08",
  colorScheme: "dark",
};

/** Organization JSON-LD — identity signals for search & AI engines. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY,
  alternateName: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  foundingDate: "2024",
  email: EMAIL,
  founder: {
    "@type": "Person",
    name: "Jalo Tuomi",
    sameAs: LINKS.founderLinkedIn,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  sameAs: [LINKS.companyLinkedIn, LINKS.founderLinkedIn],
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-ink text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <div className="progress" aria-hidden />
        <Header />
        <main>{children}</main>
        {/* No-DOM client effects: Lenis, reveals/parallax, custom cursor. */}
        <SmoothScroll />
        <ScrollFX />
        <Cursor />
        <div className="grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
