import type { Metadata } from "next";
import { LegalDocument } from "@/components/ui/LegalDocument";
import { legalDocs } from "@/content/legal";

const doc = legalDocs["privacy-policy"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument slug="privacy-policy" />;
}
