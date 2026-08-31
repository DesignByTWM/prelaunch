"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitLead } from "@/components/forms/SubmitLead";
import { services } from "@/content/services";
import { nap, routes } from "@/lib/site";

/**
 * BuildFlow
 *
 * The Design Your Build quote flow. Four steps, built in full per Jose's
 * direction, to be adjusted once Henry and Liz review the structure.
 *
 * The design decision that matters is step two. Disciplines are a
 * MULTI-SELECT, not a dropdown. This is the only place on the site where a
 * client can say they want PPF plus wraps plus wheels in one action, which
 * is exactly the pairing behaviour Liz described when she asked for PPF to
 * stand on its own. A single-select dropdown would quietly suppress the
 * highest value lead type on the site.
 *
 * State is held locally across all four steps and delivered in one call
 * from the final step. LIVE as of August 31 2026, wired to the Resend
 * lead pipeline.
 */

/**
 * Step labels are Liz's, from the Design Your Build mock: Vehicle,
 * Services, Vision, Contact. They were Disciplines and Scope before
 * August 31 2026.
 */
const STEPS = ["Vehicle", "Services", "Vision", "Contact"] as const;

interface FormState {
  year: string;
  make: string;
  model: string;
  condition: string;
  disciplines: string[];
  timeline: string;
  budget: string;
  vision: string;
  name: string;
  email: string;
  phone: string;
  preferred: string;
  /** Honeypot. Real people never fill this in, bots usually do. */
  company: string;
}

const EMPTY: FormState = {
  year: "",
  make: "",
  model: "",
  condition: "",
  disciplines: [],
  timeline: "",
  budget: "",
  vision: "",
  name: "",
  email: "",
  phone: "",
  preferred: "",
  company: "",
};

export function BuildFlow() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleDiscipline = (name: string) =>
    setForm((prev) => ({
      ...prev,
      disciplines: prev.disciplines.includes(name)
        ? prev.disciplines.filter((d) => d !== name)
        : [...prev.disciplines, name],
    }));

  const vehicleLabel =
    [form.year, form.make, form.model].filter(Boolean).join(" ") || "Not specified";

  return (
    <div className="flow">
      {/* Progress */}
      <div className="flow-progress" role="group" aria-label="Progress">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className="seg"
            data-state={i < step ? "done" : i === step ? "current" : "todo"}
          >
            <div className="bar" />
            <div className="cap">
              {String(i + 1).padStart(2, "0")} {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flow-card">
        {/* STEP 1 · VEHICLE */}
        {step === 0 && (
          <>
            <div className="flow-step-head">
              <h3>Start with the vehicle.</h3>
              <p>
                Everything else follows from what the car is. Fitment, film
                coverage and interior patterns are all vehicle specific.
              </p>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="f-year">Year</label>
                <input
                  id="f-year"
                  type="text"
                  inputMode="numeric"
                  placeholder="2024"
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="f-make">Make</label>
                <input
                  id="f-make"
                  type="text"
                  placeholder="Range Rover, Porsche, Ford"
                  value={form.make}
                  onChange={(e) => set("make", e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="f-model">Model and trim</label>
                <input
                  id="f-model"
                  type="text"
                  placeholder="Sport Autobiography, Cayenne S, F-250 Platinum"
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="f-condition">Current condition</label>
                <select
                  id="f-condition"
                  value={form.condition}
                  onChange={(e) => set("condition", e.target.value)}
                >
                  <option value="" disabled>Select condition</option>
                  <option>Factory, never modified</option>
                  <option>Some modifications already done</option>
                  <option>Previously wrapped or filmed</option>
                  <option>Has paint work or body repair history</option>
                  <option>Not sure</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* STEP 2 · DISCIPLINES */}
        {step === 1 && (
          <>
            <div className="flow-step-head">
              <h3>What should we do to it?</h3>
              <p>
                Select as many as apply. Most builds use more than one, and
                because every discipline runs in this building they get planned
                together as a single job rather than quoted separately.
              </p>
            </div>

            <div className="chips">
              {services.map((service) => {
                const checked = form.disciplines.includes(service.name);
                return (
                  <label key={service.slug} className="chip" data-checked={checked}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDiscipline(service.name)}
                    />
                    <span>
                      <span className="chip-name">{service.name}</span>
                      <span className="chip-note">{service.cardLine}</span>
                    </span>
                  </label>
                );
              })}
              <label className="chip" data-checked={form.disciplines.includes("Complete transformation")}>
                <input
                  type="checkbox"
                  checked={form.disciplines.includes("Complete transformation")}
                  onChange={() => toggleDiscipline("Complete transformation")}
                />
                <span>
                  <span className="chip-name">Complete transformation</span>
                  <span className="chip-note">
                    Everything the vehicle needs, planned as one build.
                  </span>
                </span>
              </label>
              <label className="chip" data-checked={form.disciplines.includes("Not sure yet")}>
                <input
                  type="checkbox"
                  checked={form.disciplines.includes("Not sure yet")}
                  onChange={() => toggleDiscipline("Not sure yet")}
                />
                <span>
                  <span className="chip-name">Not sure yet</span>
                  <span className="chip-note">
                    Bring the idea, we work out which disciplines get you there.
                  </span>
                </span>
              </label>
            </div>
          </>
        )}

        {/* STEP 3 · SCOPE */}
        {step === 2 && (
          <>
            <div className="flow-step-head">
              <h3>Scope and timing.</h3>
              <p>
                This shapes what we recommend. A vehicle needed in three weeks
                and a vehicle with no deadline get planned very differently.
              </p>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="f-timeline">Timeline</label>
                <select
                  id="f-timeline"
                  value={form.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                >
                  <option value="" disabled>Select a timeline</option>
                  <option>As soon as possible</option>
                  <option>Within 1 month</option>
                  <option>1 to 3 months</option>
                  <option>3 to 6 months</option>
                  <option>No deadline, planning ahead</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-budget">Budget range</label>
                <select
                  id="f-budget"
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                >
                  <option value="" disabled>Select a range</option>
                  <option>Under $5,000</option>
                  <option>$5,000 to $15,000</option>
                  <option>$15,000 to $30,000</option>
                  <option>$30,000 to $75,000</option>
                  <option>$75,000 and above</option>
                  <option>Prefer to discuss</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-vision">Tell us about the build</label>
              <textarea
                id="f-vision"
                placeholder="The look you are after, references you like, anything the vehicle needs to work around."
                value={form.vision}
                onChange={(e) => set("vision", e.target.value)}
              />
            </div>
          </>
        )}

        {/* STEP 4 · CONTACT AND SUMMARY */}
        {step === 3 && (
          <>
            <div className="flow-step-head">
              <h3>Where do we reach you?</h3>
              <p>
                One person handles your project from here, so whoever picks up
                will already have everything below in front of them.
              </p>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="f-name">Name</label>
                <input
                  id="f-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input
                  id="f-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input
                  id="f-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(832) 000-0000"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="f-preferred">Preferred contact</label>
                <select
                  id="f-preferred"
                  value={form.preferred}
                  onChange={(e) => set("preferred", e.target.value)}
                >
                  <option value="" disabled>Select one</option>
                  <option>Text message</option>
                  <option>Phone call</option>
                  <option>Email</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 30 }}>
              <div className="k" style={{ marginBottom: 6 }} />
              <ul className="flow-summary">
                <li>
                  <span className="k">Vehicle</span>
                  <span>{vehicleLabel}</span>
                </li>
                <li>
                  <span className="k">Condition</span>
                  <span>{form.condition || "Not specified"}</span>
                </li>
                <li>
                  <span className="k">Disciplines</span>
                  <span>
                    {form.disciplines.length > 0
                      ? form.disciplines.join(" · ")
                      : "None selected"}
                  </span>
                </li>
                <li>
                  <span className="k">Timeline</span>
                  <span>{form.timeline || "Not specified"}</span>
                </li>
                <li>
                  <span className="k">Budget</span>
                  <span>{form.budget || "Not specified"}</span>
                </li>
              </ul>
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

            <div style={{ marginTop: 28 }}>
              <SubmitLead
                label="Submit Build Request"
                collect={() => ({
                  source: "design-your-build",
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  message: form.vision,
                  company: form.company,
                  fields: [
                    { label: "Year", value: form.year },
                    { label: "Make", value: form.make },
                    { label: "Model and trim", value: form.model },
                    { label: "Condition", value: form.condition },
                    {
                      label: "Disciplines",
                      value: form.disciplines.join(", "),
                    },
                    { label: "Timeline", value: form.timeline },
                    { label: "Budget", value: form.budget },
                    { label: "Preferred contact", value: form.preferred },
                  ],
                })}
              />
            </div>

            <p className="form-note">
              Prefer to talk it through instead? Call or text {nap.phone}, or{" "}
              <Link href={routes.contact} style={{ borderBottom: "1px solid var(--gray-light)" }}>
                visit the house
              </Link>
              .
            </p>
          </>
        )}

        {/* Navigation */}
        <div className="flow-nav">
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={step === 0 ? { opacity: 0.35, pointerEvents: "none" } : undefined}
          >
            ← Back
          </button>

          {step < STEPS.length - 1 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
