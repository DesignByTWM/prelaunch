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
