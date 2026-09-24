import type { Metadata } from "next";
import { LegalDocument } from "@/components/ui/LegalDocument";
import { legalDocs } from "@/content/legal";

const doc = legalDocs["accessibility"];

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return <LegalDocument slug="accessibility" />;
}
