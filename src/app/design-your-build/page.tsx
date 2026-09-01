import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Page";
import { BuildFlow } from "@/components/forms/BuildFlow";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/site";

/**
 * DESIGN YOUR BUILD
 *
 * REBUILT August 31 2026 to Liz's mock of August 14 2026.
 *
 * Her page is deliberately bare: hero, step indicator, form. Nothing
 * else. That is the right instinct for a conversion page, so it is
 * followed rather than argued with. A form page with a long tail of
 * content underneath gives people somewhere to go other than the form.
 *
 * Removed to match her composition, logged in CLIENT_REVIEW_NOTES.md 27.6:
 *   - the five stage "What Happens Next" process block
 *   - the five question FAQ, and its FAQPage schema with it
 *   - the hero button. Her hero carries none, and the form sits directly
 *     below it anyway
 *
 * The flow itself is untouched apart from the step labels, which now read
 * Vehicle, Services, Vision and Contact, her wording. It was already four
 * steps because it was built from this same mock on August 14.
 *
 * OPEN FOR JOSE: our flow asks three things hers does not, vehicle
 * condition, budget range and preferred contact method. Budget in
 * particular qualifies a lead well but costs completions. Left in place
 * rather than cut, because removing fields from a working flow on launch
 * day is not a change worth making blind.
 */

export const metadata: Metadata = {
  title: "Design Your Build",
  description:
    "Start a custom vehicle build with DESIGNBYTWM in Houston. Tell us the vehicle, select the disciplines and we plan the whole build as one coordinated project with one point of contact.",
  alternates: { canonical: routes.designYourBuild },
};

export default function DesignYourBuildPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Design Your Build", path: routes.designYourBuild },
          ]),
        ]}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: routes.home },
          { label: "Design Your Build" },
        ]}
        title="Let's design your build."
        intro="Four short steps. Tell us about your vehicle and vision and we'll follow up to schedule a consultation."
        hideCta
      />

      <section id="flow">
        <div className="wrap">
          <BuildFlow />
        </div>
      </section>
    </>
  );
}
