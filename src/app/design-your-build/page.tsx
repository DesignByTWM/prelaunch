import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero, SecHead, FaqBlock } from "@/components/ui/Page";
import { BuildFlow } from "@/components/forms/BuildFlow";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { processSteps } from "@/content/house";
import { nap, routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design Your Build",
  description:
    "Start a custom vehicle build with DESIGNBYTWM in Houston. Tell us the vehicle, select the disciplines and we plan the whole build as one coordinated project with one point of contact.",
  alternates: { canonical: routes.designYourBuild },
};

const flowFaqs = [
  {
    question: "What happens after I submit a build request?",
    answer:
      "We review the vehicle and the disciplines selected, then get in touch to schedule a consultation. Quotes are given after seeing the vehicle in person rather than from the form alone, because the same service can differ substantially between two cars.",
  },
  {
    question: "Do I need to know exactly what I want before starting?",
    answer:
      "No. There is a not sure yet option in the flow for exactly that reason. Many clients arrive knowing how they want the vehicle to feel without knowing which disciplines get them there, and working that out is part of the consultation.",
  },
  {
    question: "Can I select more than one service?",
    answer:
      "Yes, and most people do. Select every discipline you are considering. Because all ten are performed in house they get planned together as a single build on one timeline rather than quoted as separate jobs.",
  },
  {
    question: "Is submitting a build request a commitment?",
    answer:
      "No. It starts a conversation and nothing more. No deposit is taken and no work is scheduled until a plan has been agreed and you have approved it.",
  },
  {
    question: "How long before someone gets back to me?",
    answer: `You will hear back from the house to arrange a consultation. If you would rather not wait, call or text ${nap.phone} and you can usually get an answer during shop hours.`,
  },
];

export default function DesignYourBuildPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Design Your Build", path: routes.designYourBuild },
          ]),
          faqSchema(flowFaqs),
        ]}
      />

      <PageHero
        image="/build-sedan.webp"
        imageAlt="Completed multi discipline build by DESIGNBYTWM"
        crumbs={[{ label: "Home", href: routes.home }, { label: "Design Your Build" }]}
        title={
          <>
            Design
            <br />
            your build.
          </>
        }
        intro="Four questions about the vehicle and what you want it to become. Everything gets planned as one build, on one timeline, with one point of contact."
        ctaLabel="Start Below"
        ctaHref="#flow"
      />

      <section id="flow">
        <div className="wrap">
          <BuildFlow />
        </div>
      </section>

      {/* What happens next */}
      <section className="alt">
        <div className="wrap">
          <SecHead
            eyebrow="What Happens Next"
            title={
              <>
                From request
                <br />
                to delivery.
              </>
            }
            lede="The same five stages whether a vehicle is in for one discipline or six."
          />
          <div className="process">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.title}
                className="process-step"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SecHead
            eyebrow="Before You Start"
            title={
              <>
                Common
                <br />
                questions.
              </>
            }
          />
          <FaqBlock faqs={flowFaqs} />
        </div>
      </section>
    </>
  );
}
