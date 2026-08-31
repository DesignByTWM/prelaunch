"use server";

import { Resend } from "resend";
import {
  MAIL_FROM,
  MAIL_REPLY_FROM,
  LEAD_RECIPIENTS,
  SOURCE_LABELS,
} from "@/lib/mail-config";
import { nap, site } from "@/lib/site";

/**
 * LEAD DELIVERY
 *
 * One server action behind every form on the site. Each form submits the
 * same shape with a different `source` tag, so adding a form later is a
 * new tag rather than new plumbing.
 *
 * Two emails go out per submission:
 *   1. To the house, with everything the customer entered, reply-to set
 *      to the customer so a reply goes straight back to them.
 *   2. To the customer, confirming it arrived and giving them the phone
 *      number in case they would rather not wait.
 *
 * The customer confirmation is not a courtesy. Without one, people submit
 * twice, then call to check, then assume the form is broken. It is the
 * cheapest reduction in support load on the whole site.
 *
 * Failure handling: if the house email fails, the whole submission fails
 * and the customer is told, because a silently lost lead is the worst
 * outcome here. If only the confirmation fails, the submission still
 * counts as a success, since the lead itself is already delivered.
 */

export interface LeadPayload {
  source: string;
  name: string;
  email: string;
  phone?: string;
  /** Honeypot. Real people never fill this in, bots usually do. */
  company?: string;
  fields?: { label: string; value: string }[];
  message?: string;
}

export interface LeadResult {
  ok: boolean;
  error?: string;
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function houseEmail(lead: LeadPayload, label: string) {
  const rows = [
    { label: "Name", value: lead.name },
    { label: "Email", value: lead.email },
    ...(lead.phone ? [{ label: "Phone", value: lead.phone }] : []),
    ...(lead.fields ?? []),
  ]
    .filter((row) => row.value && row.value.trim() !== "")
    .map(
      (row) => `
      <tr>
        <td style="padding:10px 16px 10px 0;border-bottom:1px solid #e7e5e2;font:600 11px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6e6e6e;white-space:nowrap;vertical-align:top;">${esc(row.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e7e5e2;font:400 14px/1.55 Arial,sans-serif;color:#000;">${esc(row.value)}</td>
      </tr>`,
    )
    .join("");

  const messageBlock = lead.message
    ? `
      <p style="margin:26px 0 8px;font:600 11px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6e6e6e;">Message</p>
      <p style="margin:0;font:400 14px/1.6 Arial,sans-serif;color:#000;white-space:pre-wrap;">${esc(lead.message)}</p>`
    : "";

  return `
  <div style="background:#f5f5f5;padding:32px 16px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e5e2;">
      <div style="background:#1c1c1c;padding:24px 28px;">
        <p style="margin:0;font:600 11px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.18em;color:#00a19b;">New Request</p>
        <p style="margin:8px 0 0;font:300 22px/1.2 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#fff;">${esc(lead.name)}</p>
        <p style="margin:6px 0 0;font:400 12px/1.4 Arial,sans-serif;color:rgba(255,255,255,.65);">${esc(label)}</p>
      </div>
      <div style="padding:28px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        ${messageBlock}
        <p style="margin:28px 0 0;font:400 12px/1.5 Arial,sans-serif;color:#6e6e6e;">
          Reply to this email to answer ${esc(lead.name)} directly.
        </p>
      </div>
    </div>
  </div>`;
}

function customerEmail(lead: LeadPayload) {
  const firstName = lead.name.trim().split(" ")[0] || "Hello";

  return `
  <div style="background:#f5f5f5;padding:32px 16px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e5e2;">
      <div style="background:#1c1c1c;padding:28px;">
        <p style="margin:0;font:600 13px/1.4 Arial,sans-serif;letter-spacing:.12em;color:#fff;">DESIGNBYTWM</p>
        <p style="margin:8px 0 0;font:300 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#00a19b;">Designed in-house.</p>
      </div>
      <div style="padding:32px 28px;">
        <p style="margin:0 0 18px;font:400 15px/1.6 Arial,sans-serif;color:#000;">${esc(firstName)},</p>
        <p style="margin:0 0 18px;font:400 15px/1.6 Arial,sans-serif;color:#000;">
          Thank you for getting in touch. Your request has reached the house and someone will follow up to arrange a consultation.
        </p>
        <p style="margin:0 0 18px;font:400 15px/1.6 Arial,sans-serif;color:#000;">
          We quote per vehicle after seeing it in person rather than from a price list, because the same work can differ a great deal between two cars. The consultation is where that gets worked out.
        </p>
        <p style="margin:0 0 26px;font:400 15px/1.6 Arial,sans-serif;color:#000;">
          If you would rather not wait, call or text ${esc(nap.phone)} and you can usually get an answer during shop hours.
        </p>
        <a href="${site.url}" style="display:inline-block;background:#00a19b;color:#ffffff;text-decoration:none;padding:14px 28px;font:700 12px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;">See the work</a>
      </div>
      <div style="padding:20px 28px;border-top:1px solid #e7e5e2;">
        <p style="margin:0;font:400 12px/1.6 Arial,sans-serif;color:#6e6e6e;">
          ${esc(nap.businessName)}<br>
          ${esc(nap.street)}, ${esc(nap.city)}, ${esc(nap.state)} ${esc(nap.postalCode)}<br>
          ${esc(nap.phone)}
        </p>
      </div>
    </div>
  </div>`;
}

export async function submitLead(lead: LeadPayload): Promise<LeadResult> {
  // Honeypot. Silently succeed so a bot learns nothing from the response.
  if (lead.company && lead.company.trim() !== "") {
    return { ok: true };
  }

  if (!lead.name?.trim() || !lead.email?.trim()) {
    return { ok: false, error: "Please add your name and email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
    return { ok: false, error: "That email address does not look right." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set. Lead was not delivered.");
    return {
      ok: false,
      error: `Something went wrong on our end. Please call or text ${nap.phone}.`,
    };
  }

  const resend = new Resend(key);
  const label = SOURCE_LABELS[lead.source] ?? lead.source;

  try {
    const houseSend = await resend.emails.send({
      from: MAIL_FROM,
      to: LEAD_RECIPIENTS,
      replyTo: lead.email,
      subject: `New Request: ${lead.name} — ${label}`,
      html: houseEmail(lead, label),
    });

    if (houseSend.error) {
      console.error("Lead notification failed:", houseSend.error);
      return {
        ok: false,
        error: `Something went wrong on our end. Please call or text ${nap.phone}.`,
      };
    }
  } catch (err) {
    console.error("Lead notification threw:", err);
    return {
      ok: false,
      error: `Something went wrong on our end. Please call or text ${nap.phone}.`,
    };
  }

  /**
   * The lead is delivered by this point, so a failure below is logged and
   * swallowed. Telling someone their request failed when it did not would
   * make them submit again.
   */
  try {
    await resend.emails.send({
      from: MAIL_REPLY_FROM,
      to: [lead.email],
      subject: "We have your request, DESIGNBYTWM",
      html: customerEmail(lead),
    });
  } catch (err) {
    console.error("Customer confirmation failed:", err);
  }

  return { ok: true };
}
