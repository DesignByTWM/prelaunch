import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, FaqBlock, CustomBand } from "@/components/ui/Page";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { companyFaqGroups, companyFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { nap, routes } from "@/lib/site";

/**
 * FAQ PAGE
 *
 * The primary AEO asset on the site. Two content sources feed it:
 *
 *   1. companyFaqGroups  entity-level questions about the business itself
 *   2. services[].faqs   the same objects that render on each service page
 *
 * The service questions are not duplicated by hand. They are pulled from
 * the single source in services.ts, so when Liz corrects an answer it
 * updates the service page, this page and the schema in one edit.
 *
 * Answers render inside native <details> elements, which means the text is
 * present in the DOM whether or not a panel is open. Content hidden behind
 * JavaScript is frequently not indexed, and these answers exist precisely
 * to be lifted by an answer engine.
 */

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about automotive customization at DESIGNBYTWM in Houston: how builds work, what services cost, timelines, aftercare and questions on all ten in-house disciplines.",
  alternates: { canonical: routes.faq },
};

const serviceGroups = services.map((service) => ({
  id: service.slug,
  label: service.shortName,
  intro: service.cardLine,
  href: routes.service(service.slug),
  items: service.faqs,
}));

const allFaqs = [...companyFaqs, ...services.flatMap((s) => s.faqs)];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        graph={[
          faqSchema(allFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: routes.faq },
          ]),
        ]}
      />

      <PageHero
        image="/hero.webp"
        imageAlt="Completed DESIGNBYTWM build photographed in an open environmental setting"
        crumbs={[{ label: "Home", href: routes.home }, { label: "FAQ" }]}
        title={<>Questions,<br />answered.</>}
        intro="Everything clients ask before, during and after a build, plus the technical questions on all ten disciplines performed in house."
        ctaLabel="Ask Us Directly"
        ctaHref="#intake"
      />

      {/* Jump navigation. Also gives crawlers an internal link map of the page. */}
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <SecHead
            eyebrow="Contents"
            title={<>Find what<br />you need.</>}
            lede={`${allFaqs.length} questions across the house, the process and every discipline.`}
          />
          <Reveal className="faq-nav">
            {[...companyFaqGroups, ...serviceGroups].map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Company level questions */}
      <section>
        <div className="wrap">
          {companyFaqGroups.map((group) => (
            <div key={group.id} id={group.id} className="faq-group">
              <SecHead eyebrow="The House" title={group.label} lede={group.intro} />
              <FaqBlock faqs={group.items} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="wrap">
          <CustomBand
            heading={
              <>
                Still have a question
                <br />
                about your vehicle?
              </>
            }
            ctaLabel="Talk To Us"
            ctaHref="#intake"
          />
        </div>
      </section>

      {/* Service level questions, pulled from services.ts */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="By Discipline"
            title={<>Questions about<br />the work itself.</>}
            lede="Technical questions on each of the ten disciplines. Every answer also appears on that discipline's own page."
          />

          {serviceGroups.map((group) => (
            <div key={group.id} id={group.id} className="faq-group">
              <SecHead eyebrow="Discipline" title={group.label} lede={group.intro} />
              <FaqBlock faqs={group.items} />
              <Reveal style={{ marginTop: 22 }}>
                <Link href={group.href} className="arrow-link">
                  {group.label} in full →
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <IntakeForm
        eyebrow="Still Not Sure?"
        title="Ask us directly."
        lede={`If your question is not here, tell us about the vehicle and we will answer it. You can also call or text ${nap.phone}.`}
        source="faq"
      />
    </>
  );
}
