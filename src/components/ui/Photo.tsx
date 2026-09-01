"use client";

/**
 * Photo
 *
 * Image inside a .ph frame that hides itself if the file is missing,
 * leaving the striped placeholder visible instead of a broken image icon.
 *
 * This is the same behaviour the V2 demo used via inline onerror, and it is
 * what lets us reserve photo slots for artwork Liz has not delivered yet.
 * Drop the correctly named file into /public and the slot fills itself with
 * no code change.
 *
 * TWO PATHS, AND WHY THE ELEMENT IS suppressHydrationWarning
 *
 * A file can 404 before React hydrates. The capture phase listener in
 * layout.tsx catches that and marks the element with data-broken, which
 * globals.css hides. React then arrives to hydrate an <img> carrying an
 * attribute it never rendered, and reports a mismatch.
 *
 * suppressHydrationWarning tells React not to diff attributes on this
 * node. That is correct rather than a silencer: data-broken is set by the
 * browser in response to a real load failure, it is not derived from any
 * prop or state, and there is nothing for React to reconcile it against.
 * The alternative, tracking load failures in state, would mean the markup
 * could not be server rendered at all.
 *
 * onError below stays as the path for a failure that happens after
 * hydration, when the listener has already done its work for the initial
 * paint and React owns the node.
 */
export function Photo({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <img
      suppressHydrationWarning
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
