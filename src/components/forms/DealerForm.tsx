"use client";

import { useState } from "react";
import { SubmitLead } from "@/components/forms/SubmitLead";

/**
 * DealerForm
 *
 * Liz's dealer account application, extracted from the Dealer Services
 * page on August 31 2026 so it can hold state and submit. The markup is
 * hers, unchanged. Only the wiring is new.
 *
 * It returns the fields alone rather than its own section, so the page
 * keeps the Reveal wrapper and the form-panel shell. Same arrangement as
 * ContactForm.
 *
 * Contact Name is the lead name and the dealership travels as a field,
 * because a reply has to be addressed to a person rather than to a
 * business.
 */
export function DealerForm() {
  const [form, setForm] = useState({
    dealership: "",
    name: "",
    email: "",
    phone: "",
    volume: "1 to 5 vehicles",
    message: "",
    company: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="row">
        <div className="field">
          <label htmlFor="d-dealership">Dealership Name</label>
          <input
            id="d-dealership"
            type="text"
            placeholder="Dealership name"
            autoComplete="organization"
            value={form.dealership}
            onChange={(e) => set("dealership", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="d-contact">Contact Name</label>
          <input
            id="d-contact"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="d-email">Email</label>
          <input
            id="d-email"
            type="email"
            placeholder="name@dealership.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="d-phone">Phone</label>
          <input
            id="d-phone"
            type="tel"
            placeholder="(832) 000-0000"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="d-volume">Estimated Monthly Volume</label>
        <select
          id="d-volume"
          value={form.volume}
          onChange={(e) => set("volume", e.target.value)}
        >
          <option>1 to 5 vehicles</option>
          <option>6 to 15 vehicles</option>
          <option>16 to 30 vehicles</option>
          <option>30 or more vehicles</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="d-message">Message</label>
        <textarea
          id="d-message"
          placeholder="Tell us about your dealership and what you are looking for."
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

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
        label="Submit Application"
        collect={() => ({
          source: "dealer-services",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
          fields: [
            { label: "Dealership", value: form.dealership },
            { label: "Estimated monthly volume", value: form.volume },
          ],
        })}
      />
    </>
  );
}
