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
 * referral_source is populated from the "How did you hear about us?"
 * question added to the consumer forms on September 8 2026. When the
 * visitor names who referred them, that name is appended in parentheses,
 * so Henry sees the source and the referrer in one field.
 *
 * Our `source`, meaning which form on the site was used, is a different
 * thing and still goes into the message body rather than referral_source.
 */

const CRM_ENDPOINT = "https://dsbos.base44.app/functions/submitLead";

/** Our form field labels mapped to Henry's JSON keys. */
const FIELD_MAP: Record<string, string> = {
  "vehicle": "vehicle",
  "service of interest": "service_interest",
  "timeline": "timeline",
  "package tier": "package_tier",
  "how they heard about us": "referral_source",
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

  // Held back from both the field map and the unmapped list, because it is
  // not a field of its own in Base44. It is folded into referral_source
  // below so the source and the referrer read as one answer.
  let referredBy = "";

  for (const field of lead.fields ?? []) {
    if (!field.value?.trim()) continue;
    const label = field.label.trim().toLowerCase();

    if (label === "referred by") {
      referredBy = field.value.trim();
      continue;
    }

    const mapped = FIELD_MAP[label];
    if (mapped) {
      payload[mapped] = field.value.trim();
    } else {
      unmapped.push(`${field.label}: ${field.value.trim()}`);
    }
  }

  // "Referral from a friend" plus "Mike Torres" becomes
  // "Referral from a friend (Mike Torres)". A name arriving without a
  // selection stands on its own rather than being dropped.
  if (referredBy) {
    payload.referral_source = payload.referral_source
      ? `${payload.referral_source} (${referredBy})`
      : referredBy;
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
