"use client";

import { useState } from "react";
import { submitLead, type LeadPayload } from "@/app/actions/lead";

/**
 * SubmitLead
 *
 * The one submit control on the site. Handles the three states a form
 * can be in, and nothing else: ready, sending, done.
 *
 * On success the whole form is replaced by a confirmation rather than
 * showing a message above a still-filled form. Leaving the filled form
 * on screen is what makes people press submit a second time.
 *
 * Errors are shown inline and the form stays filled, so nobody has to
 * retype anything after a failure.
 */
export function SubmitLead({
  label,
  collect,
  successTitle = "Request received.",
  successBody = "Someone from the house will follow up to arrange a consultation.",
}: {
  label: string;
  /** Reads the current form values at the moment of submission. */
  collect: () => LeadPayload;
  successTitle?: string;
  successBody?: string;
}) {
  const [state, setState] = useState<"ready" | "sending" | "done">("ready");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setState("sending");

    try {
      const result = await submitLead(collect());
      if (result.ok) {
        setState("done");
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
        setState("ready");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setState("ready");
    }
  }

  if (state === "done") {
    return (
      <div className="form-done" role="status" aria-live="polite">
        <span className="eyebrow">Sent</span>
        <h3 className="display">{successTitle}</h3>
        <p>{successBody}</p>
      </div>
    );
  }

  return (
    <div className="form-submit">
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleSubmit}
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending…" : label}
      </button>
    </div>
  );
}
