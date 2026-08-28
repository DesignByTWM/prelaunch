import Link from "next/link";
import { Monogram } from "@/components/BrandMarks";
import { headlineServices } from "@/content/services";
import { nap, routes } from "@/lib/site";

/**
 * 404
 *
 * A dead end is a lead about to leave. Rather than a bare message, this
 * routes to the five headline disciplines and gives the phone number, so a
 * broken link becomes a navigation problem rather than a lost inquiry.
 */
export default function NotFound() {
  return (
    <section style={{ paddingTop: "clamp(70px,10vw,130px)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <Monogram />

        <h1 className="display" style={{ fontSize: "clamp(30px,5vw,58px)", margin: "18px 0 16px" }}>
          That page
          <br />
          is not here.
        </h1>

        <p className="lede" style={{ margin: "0 auto 34px" }}>
          The link may be out of date or the page may have moved. Here is where
          most people are heading.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <Link href={routes.home} className="btn btn-primary">
            Back to the house
          </Link>
          <a href={nap.phoneHref} className="btn btn-line">
            Contact the House
          </a>
        </div>

        <div className="cross-grid" style={{ textAlign: "left" }}>
          {headlineServices.map((service) => (
            <Link key={service.slug} href={routes.service(service.slug)} className="cross">
              <div className="name">{service.name}</div>
              <div className="desc">{service.cardLine}</div>
              <span className="go">Explore →</span>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 40 }}>
          <Link href={routes.services} className="arrow-link">
            All ten disciplines →
          </Link>
        </p>
      </div>
    </section>
  );
}
