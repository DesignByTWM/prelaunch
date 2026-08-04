import type { Metadata, Viewport } from "next";
import { Inter, Quicksand } from "next/font/google";
import { BrandSprite } from "@/components/BrandMarks";
import { Header } from "@/components/Header";
import { Footer, SmsFloat } from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

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
  },
  twitter: { card: "summary_large_image" },
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
      <body>
        <BrandSprite />
        <JsonLd graph={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmsFloat />
      </body>
    </html>
  );
}
