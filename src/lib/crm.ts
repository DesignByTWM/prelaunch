import type { LeadPayload } from "@/app/actions/lead";
import { SOURCE_LABELS } from "@/lib/mail-config";

/**
 * BASE44 CRM DELIVERY
 *
 * Secondary destination for every lead. The email pipeline stays primary
 * and permanent: if this fails, the lead has already been delivered and
 * the customer sees no error. A CRM outage must never lose an inquiry.
 *
 * Field names follow Henry's integration guide of September 5 2026.
 *
 * referral_source is deliberately not populated. In Base44 that field is a
 * "how did you hear about us" answer from the customer. Our `source` is
 * which form on the site was used, which is a different thing. Conflating
 * them would corrupt the CRM's own reporting, so our source is written
 * into the message body instead.
 */

const CRM_ENDPOINT = "https://dsbos.base44.app/functions/submitLead";

/** Our form field labels mapped to Henry's JSON keys. */
const FIELD_MAP: Record<string, string> = {
  "vehicle": "vehicle",
  "service of interest": "service_interest",
  "timeline": "timeline",
  "package tier": "package_tier",
};

export async function sendToCrm(lead: LeadPayload): Promise<void> {
  const key = process.env.TWM_CRM_KEY;

  // No key configured means preview or local. Never post to the live CRM.
  if (!key) return;

  const payload: Record<string, string> = {
    name: lead.name.trim(),
    email: lead.email.trim(),
  };

  if (lead.phone?.trim()) payload.phone = lead.phone.trim();

  // Anything we do not have a mapping for is preserved in the message
  // rather than dropped, so no customer input is ever lost.
  const unmapped: string[] = [];

  for (const field of lead.fields ?? []) {
    if (!field.value?.trim()) continue;
    const mapped = FIELD_MAP[field.label.trim().toLowerCase()];
    if (mapped) {
      payload[mapped] = field.value.trim();
    } else {
      unmapped.push(`${field.label}: ${field.value.trim()}`);
    }
  }

  const sourceLabel = SOURCE_LABELS[lead.source] ?? lead.source;
  const messageParts = [
    `Submitted from: ${sourceLabel}`,
    ...unmapped,
    ...(lead.message?.trim() ? ["", lead.message.trim()] : []),
  ];
  payload.message = messageParts.join("\n");

  try {
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-key": key,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(
        `CRM delivery failed with ${res.status} for ${lead.email}. Lead was delivered by email.`,
      );
    }
  } catch (err) {
    console.error(
      `CRM delivery threw for ${lead.email}. Lead was delivered by email.`,
      err,
    );
  }
}
