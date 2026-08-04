import { nap } from "@/lib/site";

/**
 * FormPending
 *
 * Shown in place of a live submit control during the client review build.
 *
 * The alternative, a live-looking teal button that silently does nothing,
 * is worse than an obviously inactive one. Reviewers will click it, get no
 * response and assume something is broken.
 *
 * REMOVE when the lead pipeline goes in.
 */
export function FormPending({ label }: { label: string }) {
  return (
    <>
      <button className="btn btn-inactive" type="button" disabled aria-disabled="true">
        {label}
      </button>

      <div className="form-pending">
        <b>Review build.</b> Form delivery is switched on at launch, once you
        have confirmed the fields you want on this form. Nothing submitted here
        is sent anywhere yet. To reach the house in the meantime, call or text{" "}
        {nap.phone}.
      </div>
    </>
  );
}
