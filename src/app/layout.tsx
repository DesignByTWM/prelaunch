import type { Metadata, Viewport } from "next";
import { Inter, Quicksand } from "next/font/google";
import { site } from "@/lib/site";

/**
 * ROOT LAYOUT
 *
 * The HTML shell and nothing else: html, body, the two font variables and
 * the site wide metadata defaults.
 *
 * Everything that makes a page look like the site, the header, the footer,
 * the floating text button, the organization schema, GA4, Vercel Analytics
 * and globals.css, lives in app/(site)/layout.tsx instead.
 *
 * That split exists for /studio. The Sanity Studio is a full screen
 * application with its own styling, and it must not carry the site chrome
 * or fire analytics. Keeping the chrome one level down in the (site) route
 * group means /studio cannot inherit any of it, rather than relying on a
 * conditional that could quietly stop working. Route groups do not change
 * URLs, so every existing path is unchanged.
 */

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-quicksand",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DESIGNBYTWM | Luxury Automotive Customization in Houston, Texas",
    template: "%s | DESIGNBYTWM",
  },
  description:
    "DESIGNBYTWM is Houston's in-house automotive customization house. Blackout packages, PPF, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, all coordinated by one team.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "DESIGNBYTWM | Luxury Automotive Customization in Houston, Texas",
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/sharepreviewdbtwm.webp",
        width: 1200,
        height: 630,
        alt: "DESIGNBYTWM, the automotive customization house in Houston, Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/sharepreviewdbtwm.webp"],
  },
  icons: {
    icon: "/logos/designbytwm_monogram_black.svg",
    apple: "/logos/designbytwm_monogram_black.svg",
  },
  robots: site.isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${quicksand.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
