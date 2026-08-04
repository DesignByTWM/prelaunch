"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveal
 *
 * Mirrors the approved V2 behaviour exactly: an IntersectionObserver at a
 * 0.12 threshold adds `in` once, then unobserves. All visual work lives in
 * CSS under .rv, .rv-card and the .d1 to .d5 delay classes.
 *
 * card=true adds .rv-card, which layers the mask unveil and the trailing
 * image settle on top of the approved 3D entry.
 */

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** 1 to 5. Maps to the approved .d1 to .d5 stagger delays. */
  delay?: 1 | 2 | 3 | 4 | 5;
  /** Adds the mask unveil and image settle on photographic cards. */
  card?: boolean;
  className?: string;
  href?: string;
}

export function Reveal({
  children,
  as: Tag = "div",
  delay,
  card = false,
  className = "",
  ...rest
}: RevealProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [
    "rv",
    card ? "rv-card" : "",
    delay ? `d${delay}` : "",
    shown ? "in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
