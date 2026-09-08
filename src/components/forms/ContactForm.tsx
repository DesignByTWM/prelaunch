"use client";

import { useState } from "react";
import { SubmitLead } from "@/components/forms/SubmitLead";
import { PhotoUpload } from "@/components/forms/PhotoUpload";
import type { CompressedImage } from "@/lib/compress-image";

/**
 * ContactForm
 *
 * Liz's short message form from the Contact mock: name, email, phone,
 * message. Live as of August 31 2026.
 *
 * The honeypot is a real input, visually hidden and marked
 * aria-hidden with tabIndex -1, so a screen reader and a keyboard user
 * both skip it while a form filling bot does not.
 */
export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    heardFrom: "",
    referredBy: "",
    company: "",
  });

  const [photos, setPhotos] = useState<CompressedImage[]>([]);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input
            id="c-name"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-phone">Phone</label>
        <input
          id="c-phone"
          type="tel"
          placeholder="(832) 000-0000"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="heard-from">How did you hear about us?</label>
          <select
            id="heard-from"
            value={form.heardFrom}
            onChange={(e) => set("heardFrom", e.target.value)}
          >
            <option value="">Select an option</option>
            <option>Google</option>
            <option>Instagram/Facebook</option>
            <option>Referral from a friend</option>
            <option>Drive-by / saw the shop</option>
            <option>Repeat customer</option>
            <option>Other</option>
          </select>
        </div>
        {form.heardFrom === "Referral from a friend" ? (
          <div className="field">
            <label htmlFor="referred-by">Who referred you?</label>
            <input
              id="referred-by"
              type="text"
              placeholder="Person or business name"
              value={form.referredBy}
              onChange={(e) => set("referredBy", e.target.value)}
            />
          </div>
        ) : null}
      </div>

      <PhotoUpload images={photos} onChange={setPhotos} />

      {/* Honeypot. Never shown, never focusable, never announced. */}
      <input
        type="text"
        name="company"
        className="hp-field"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={form.company}
        onChange={(e) => set("company", e.target.value)}
      />

      <SubmitLead
        label="Send Message"
        collect={() => ({
          source: "contact",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
          fields: [
            ...(form.heardFrom ? [{ label: "How they heard about us", value: form.heardFrom }] : []),
            ...(form.referredBy ? [{ label: "Referred by", value: form.referredBy }] : []),
          ],
          attachments: photos,
        })}
      />
    </>
  );
}
