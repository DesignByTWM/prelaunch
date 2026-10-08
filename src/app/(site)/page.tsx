import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { KeywordTicker } from "@/components/home/KeywordTicker";
import { Services } from "@/components/home/Services";
import { FeaturedBuilds, ShopWheels } from "@/components/home/HouseSections";
import { Reviews } from "@/components/home/Reviews";
import { IntakeForm } from "@/components/home/IntakeForm";
import { JsonLd, JsonLdNode, breadcrumbSchema, reviewSchemas } from "@/lib/schema";
import { headlineServices } from "@/content/services";
import { reviews } from "@/content/reviews";
import { nap } from "@/lib/site";

/* The hero, the card photos and the featured builds are read from Sanity.
   Rebuilt at most hourly, and immediately when the publish webhook fires. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Luxury Automotive Customization in Houston, Texas",
  description:
    "DESIGNBYTWM is Houston's in-house automotive customization house. Blackout packages, PPF, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, all coordinated by one team.",
  alternates: { canonical: "/" },
};

/**
 * Homepage FAQ set for answer engines. Two positioning questions plus one
 * question from each headline discipline. Every answer here is also visible
 * on the site, never schema only.
 */
const homeFaqs = [
  {
    question: "What does Design By TWM do?",
    answer: `Design By TWM is an automotive customization house in ${nap.city}, ${nap.stateFull}. It performs ten disciplines in house: blackout packages, paint protection film, vehicle wraps, wheels and fitment, interior transformation, suspension, paint and body, lighting, audio and truck accessories, plus a separate dealer services division.`,
  },
  {
    question: "Why does in-house work matter for a custom vehicle build?",
    answer:
      "When a build involves several disciplines, work handed between separate shops creates gaps in scheduling, finish matching and accountability. Performing every discipline in one building means one timeline, one point of contact and one team answerable for the finished vehicle.",
  },
  ...headlineServices.map((service) => service.faqs[0]),
];

export default function HomePage() {
  return (
    <>
      <JsonLd graph={[breadcrumbSchema([{ name: "Home", path: "/" }])]} />
      {/* The reviews are visible only here, so their structured data is
          emitted only here: one standalone Review per card. */}
      {reviewSchemas(reviews).map((node) => (
        <JsonLdNode key={node.url} node={node} />
      ))}
      <Hero />
      <KeywordTicker />
      <Services />
      <Reviews />
      <FeaturedBuilds />
      <ShopWheels />
      <IntakeForm />
    </>
  );
}
