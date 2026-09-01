"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { routes } from "@/lib/site";
import type { FeaturedBuild } from "@/content/builds";

/**
 * BUILD FINDER
 *
 * Liz's search and type filters from the Featured Builds mock, built as
 * they behave in her file rather than as decoration. Her mock ships real
 * JavaScript at the foot of the page: the search matches against the
 * vehicle name, the pills filter by type, and a message appears when
 * nothing matches.
 *
 * This is the one place on the site where her filter controls are worth
 * building. On Shop Wheels the same pills filtered nothing, so they were
 * left out. Here they do the job she wrote them to do.
 *
 * Client component because it holds two pieces of state. Everything above
 * and below it on the page stays server rendered, so the cards are still
 * in the initial HTML and still crawlable.
 *
 * Search covers vehicle, title and discipline tags rather than vehicle
 * alone. Someone typing "wheels" is looking for wheel builds, and her
 * version would have returned nothing for that.
 */

const TYPES = ["All", "SUV", "Sedan", "Truck", "Coupe"] as const;
type Filter = (typeof TYPES)[number];

export function BuildFinder({ builds }: { builds: FeaturedBuild[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Filter>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return builds.filter((build) => {
      const matchesType = type === "All" || build.type === type;
      const matchesQuery =
        q === "" ||
        build.vehicle.toLowerCase().includes(q) ||
        build.title.toLowerCase().includes(q) ||
        build.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [builds, query, type]);

  return (
    <>
      <div className="search-row">
        <label htmlFor="vehicle-search" className="sr-only">
          Search builds by make or model
        </label>
        <input
          id="vehicle-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by make or model, for example G 63, Corvette, Sierra"
          autoComplete="off"
        />
      </div>

      <div
        className="filter-row"
        role="group"
        aria-label="Filter builds by vehicle type"
      >
        {TYPES.map((option) => (
          <button
            key={option}
            type="button"
            className={`pill filter${type === option ? " active" : ""}`}
            aria-pressed={type === option}
            onClick={() => setType(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="builds-grid">
          {visible.map((build) => (
            <Link
              key={build.slug}
              href={`${routes.builds}/${build.slug}`}
              className="build-card"
            >
              <div className="ph r45">
                <Photo src={build.hero} alt={build.heroAlt} />
                <span className="pill">{build.type}</span>
              </div>
              <div className="build-card-body">
                <h3>
                  {build.vehicle}: {build.title}
                </h3>
                <p>{build.tags.join(" · ")}</p>
                <span className="go">View Build →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results">
          No builds match that search yet. Tell us about your vehicle and it
          could be the first.
        </p>
      )}
    </>
  );
}
