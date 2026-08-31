"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SubmitLead } from "@/components/forms/SubmitLead";
import { services } from "@/content/services";

/**
 * IntakeForm
 *
 * Approved V2 layout and copy, now reusable across pages.
 *
 * `source` is the important prop. Every page that renders this form stamps
 * its own source, which is carried into the lead payload so the pipeline
 * can attribute a lead to the exact page that produced it. Without it the
 * 22 location pages and 10 service pages are unmeasurable.
 *
 * A source with no entry in SOURCE_LABELS is not a failure. The lead
 * action falls back to the raw tag, so a page can stamp anything and the
 * house email still says where it came from.
 *
 * `preselect` matches a service name so a visitor arriving from a service
 * page finds the dropdown already set. It seeds the state rather than
 * setting a defaultValue, because the select is controlled now.
 *
 * LIVE as of August 31 2026, wired to the Resend lead pipeline.
 */
export function IntakeForm({
  eyebrow = "Get Started",
  title = "Design your build.",
  lede = "Tell us about your vehicle and what you have in mind. We follow up to schedule a consultation.",
  source = "home",
  preselect,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  source?: string;
  preselect?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: preselect ?? "",
    timeline: "",
    vision: "",
    company: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section id="intake">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display">{title}</h2>
          <p className="lede" style={{ margin: "0 auto" }}>{lede}</p>
        </Reveal>

        <Reveal className="form-card">
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@email.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                placeholder="(832) 000-0000"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="vehicle">Vehicle</label>
              <input
                id="vehicle"
                type="text"
                placeholder="Year, make and model"
                value={form.vehicle}
                onChange={(e) => set("vehicle", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="service">Service of interest</label>
              <select
                id="service"
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
              >
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
                <option>Complete transformation</option>
                <option>Custom, not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <select
                id="timeline"
                value={form.timeline}
                onChange={(e) => set("timeline", e.target.value)}
              >
                <option value="" disabled>Select a timeline</option>
                <option>As soon as possible</option>
                <option>1 to 3 months</option>
                <option>3 to 6 months</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="vision">Tell us about the project</label>
            <textarea
              id="vision"
              placeholder="Describe your vehicle and the transformation you have in mind."
              value={form.vision}
              onChange={(e) => set("vision", e.target.value)}
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
            label="Request Consultation"
            collect={() => ({
              source,
              name: form.name,
              email: form.email,
              phone: form.phone,
              message: form.vision,
              company: form.company,
              fields: [
                { label: "Vehicle", value: form.vehicle },
                { label: "Service of interest", value: form.service },
                { label: "Timeline", value: form.timeline },
              ],
            })}
          />
        </Reveal>
      </div>
    </section>
  );
}
