import type { Metadata } from "next";
import { LegalDocument } from "@/components/ui/LegalDocument";
import { legalDocs } from "@/content/legal";

const doc = legalDocs["terms"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDocument slug="terms" />;
}
