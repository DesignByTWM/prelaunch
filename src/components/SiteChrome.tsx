import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { BrandSprite } from "@/components/BrandMarks";
import { Header } from "@/components/Header";
import { Footer, SmsFloat } from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "../app/globals.css";

/**
 * SiteChrome
 *
 * Everything that makes a page look like the site: the stylesheet, the
 * brand sprite, the organization and website schema, the header, the
 * footer, the floating text button and both analytics scripts. Exactly
 * what the root layout used to render inside its body tag.
 *
 * It lives in a component rather than only in app/(site)/layout.tsx
 * because the global 404 sits at app/not-found.tsx, outside that route
 * group. Next only uses a not-found file at the app root for unmatched
 * URLs, so the 404 cannot be inside (site), and without this it would
 * render with no header and no footer.
 *
 * The stylesheet is imported here rather than in the layout so it travels
 * with the chrome. Anything that does not render SiteChrome, which today
 * means /studio, gets no site CSS at all.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Marks any image that fails to load with data-broken, which
        globals.css hides, leaving the charcoal frame behind it visible
        instead of a broken image icon.

        It sets an attribute rather than an inline style because React
        manages style, and mutating it before hydration causes a
        mismatch.

        This has to be a plain inline script rather than the onError
        handler on the Photo component. An image referenced in server
        rendered HTML can fail before React hydrates, and React never
        sees that error, so the broken icon stays on screen. A capture
        phase listener registered at the top of the body catches it
        whenever it happens.

        Every photo slot on the site is deliberately empty right now,
        so this is doing real work rather than guarding an edge case.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'){t.setAttribute('data-broken','')}},true)",
        }}
      />
      <BrandSprite />
      <JsonLd graph={[organizationSchema(), websiteSchema()]} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <SmsFloat />
      <Analytics />
      {site.isProduction && process.env.NEXT_PUBLIC_GA_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      ) : null}
    </>
  );
}
