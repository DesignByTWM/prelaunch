"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/BrandMarks";
import { routes } from "@/lib/site";

/**
 * Header
 *
 * Approved V2 structure exactly: sticky, white at 92 percent with a blur,
 * hairline bottom border, 78px tall, black wordmark, four text links and
 * the teal Design Your Build button.
 *
 * Deep navigation (all ten services, locations, journal, dealer services)
 * belongs on the services page and in the footer, not here. V2 keeps the
 * header to four links and that restraint is part of the approved design.
 *
 * The mobile drawer is an addition. V2 simply hid the links under 900px,
 * which left no way to navigate on a phone.
 */

const nav = [
  { label: "Services", href: routes.services },
  { label: "Featured Builds", href: routes.builds },
  { label: "Shop Wheels", href: routes.wheels },
  { label: "Contact", href: routes.contact },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site">
      <a href="#main" className="sr-only skip">Skip to content</a>

      <div className="wrap site-in">
        <Link href={routes.home} aria-label="DESIGNBYTWM home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={routes.designYourBuild} className="btn btn-primary">
            Design Your Build
          </Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="drawer">
          <nav className="wrap" aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={routes.dealers} onClick={() => setOpen(false)}>
                  Dealer Services
                </Link>
              </li>
              {/* The header CTA is hidden on mobile, so it belongs here.
                 Without it there is no path to the quote flow from a
                 phone except the floating text pill. */}
              <li>
                <Link
                  href={routes.designYourBuild}
                  className="btn btn-primary"
                  onClick={() => setOpen(false)}
                >
                  Design Your Build
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
