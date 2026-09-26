"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";

/**
 * LocationMotion
 *
 * Every scripted animation on the location pages, in one place. Renders
 * nothing. The page itself is fully server rendered, so all copy, links
 * and schema are in the HTML before this runs. This only adds motion on
 * top.
 *
 * Stack, approved by Jose September 24 2026: GSAP with ScrollTrigger and
 * MotionPathPlugin, plus Lenis for smooth scroll. GSAP is free for
 * commercial use including all plugins. Lenis is MIT. Both are imported
 * here and nowhere else, and this file is itself loaded through
 * LocationMotionLazy, so they ship only with city pages that have content.
 *
 * HERO, September 26 2026: the light sweep and the cursor-driven light
 * were removed at Henry's request. The hero now shows the full photo from
 * the first frame. Its headline rise is pure CSS in location.css, so it
 * never waits on this script. All that remains here for the hero is the
 * slow zoom as it scrolls away.
 *
 * Everything is created inside a gsap.context and torn down on unmount,
 * and Lenis is destroyed, so navigating away leaves no scroll hijack or
 * pinned spacer behind on the next page.
 *
 * prefers-reduced-motion: no smooth scroll, no pins, no scrubs. The CSS
 * falls back to stacked sections. The map hover still works, because that
 * is information rather than motion.
 */
export function LocationMotion() {
  useEffect(() => {
    const root = document.getElementById("lp");
    if (!root) return;

    const cleanups: (() => void)[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    /* ---------- map: a list row lights its route ---------- */
    const svg = root.querySelector<SVGSVGElement>(".lp-svg");
    root.querySelectorAll<HTMLElement>(".lp-routes li").forEach((row) => {
      const id = row.dataset.route;
      const targets = () => svg?.querySelectorAll(`[data-route="${id}"]`) ?? [];
      const on = () => {
        svg?.classList.add("has-focus");
        row.classList.add("is-on");
        targets().forEach((el) => el.classList.add("is-on"));
      };
      const off = () => {
        svg?.classList.remove("has-focus");
        row.classList.remove("is-on");
        targets().forEach((el) => el.classList.remove("is-on"));
      };
      row.addEventListener("mouseenter", on);
      row.addEventListener("mouseleave", off);
      row.addEventListener("focus", on);
      row.addEventListener("blur", off);
      cleanups.push(() => {
        row.removeEventListener("mouseenter", on);
        row.removeEventListener("mouseleave", off);
        row.removeEventListener("focus", on);
        row.removeEventListener("blur", off);
      });
    });

    if (reduce) {
      return () => cleanups.forEach((fn) => fn());
    }

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const header = document.querySelector<HTMLElement>("header.site");
    const hdrH = header?.offsetHeight ?? 78;

    /* ---------- smooth scroll ---------- */
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -hdrH, duration: 1.4 });
    };
    root.addEventListener("click", onAnchor);

    const ctx = gsap.context(() => {
      /* ----- hero: a slow zoom as it scrolls away ----- */
      const hero = root.querySelector<HTMLElement>(".lp-hero");
      const img = root.querySelector<HTMLImageElement>(".lp-hero-img");
      if (hero && img) {
        gsap.to(img, {
          scale: 1.08,
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* ----- desktop only: the two pinned scenes ----- */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        /* The pair. One photo, one light edge, the text hands over. */
        const stage = root.querySelector<HTMLElement>(".lp-pair-stage");
        const items = root.querySelectorAll<HTMLElement>(".lp-swap-item");
        const tabs = root.querySelectorAll<HTMLElement>(".lp-tab");
        const frameA = root.querySelector(".lp-frame-a");
        const frameB = root.querySelector(".lp-frame-b");
        const film = root.querySelector(".lp-film");

        if (stage && items.length === 2 && frameB && film) {
          const scene = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: `top ${hdrH}px`,
              end: "+=130%",
              pin: true,
              scrub: 0.8,
              onUpdate: (s) => {
                const p = s.progress;
                tabs[0]?.style.setProperty("--p", String(Math.min(1, p / 0.45)));
                tabs[1]?.style.setProperty("--p", String(Math.max(0, (p - 0.55) / 0.45)));
                tabs[0]?.classList.toggle("is-on", p < 0.5);
                tabs[1]?.classList.toggle("is-on", p >= 0.5);
              },
            },
          });
          scene
            .to({}, { duration: 0.25 })
            .fromTo(frameA, { scale: 1 }, { scale: 1.06, duration: 1, ease: "none" }, 0)
            .to(items[0], { autoAlpha: 0, y: -30, duration: 0.2 }, 0.3)
            .set(film, { opacity: 1 }, 0.3)
            .fromTo(frameB, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "none" }, 0.3)
            .fromTo(film, { left: "0%" }, { left: "100%", duration: 0.4, ease: "none" }, 0.3)
            .to(film, { opacity: 0, duration: 0.05 }, 0.7)
            .fromTo(items[1], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.48);
        }

        /* The ten disciplines run sideways while the page holds. */
        const track = root.querySelector<HTMLElement>(".lp-track");
        const bar = root.querySelector<HTMLElement>(".lp-bar i");
        if (track) {
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: ".lp-disc",
              start: `top ${hdrH}px`,
              end: () => `+=${dist()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (s) => {
                if (bar) bar.style.transform = `scaleX(${s.progress})`;
              },
            },
          });
        }
      });

      /* ----- the map: routes draw in, then arrows run to the House ----- */
      const routes = gsap.utils.toArray<SVGPathElement>(".lp-route");
      routes.forEach((r) => {
        const len = r.getTotalLength();
        r.style.strokeDasharray = `${len}`;
        r.style.strokeDashoffset = `${len}`;
      });
      gsap.set(".lp-dest", { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
      /* Visibility rather than opacity, so the hover dimming in the CSS
         is never overridden by an inline style. */
      gsap.set(".lp-arrow", { visibility: "hidden" });

      const runArrows = () => {
        root.querySelectorAll<SVGPathElement>(".lp-arrow").forEach((arrow) => {
          const path = root.querySelector<SVGPathElement>(`.lp-route[data-route="${arrow.dataset.route}"]`);
          if (!path) return;
          gsap.set(arrow, { visibility: "visible" });
          gsap.to(arrow, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
            duration: 2.8,
            ease: "none",
            repeat: -1,
            delay: Number(arrow.dataset.k ?? 0) * 1.4,
          });
        });
      };

      gsap
        .timeline({ scrollTrigger: { trigger: ".lp-svg", start: "top 75%" } })
        .from(".lp-road", { autoAlpha: 0, duration: 0.8, stagger: 0.05 })
        .to(".lp-dest", { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.4)
        .to(routes, { strokeDashoffset: 0, duration: 1.4, stagger: 0.22, ease: "power2.inOut" }, 0.8)
        .add(runArrows);

      /* ----- featured build ----- */
      gsap.fromTo(
        ".lp-feat img",
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".lp-feat", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".lp-feat-copy > *", {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".lp-feat", start: "top 40%" },
      });

      /* ----- magnetic primary buttons ----- */
      if (!touch) {
        root.querySelectorAll<HTMLElement>(".btn-primary").forEach((b) => {
          const move = (e: MouseEvent) => {
            const r = b.getBoundingClientRect();
            gsap.to(b, {
              x: (e.clientX - r.left - r.width / 2) * 0.25,
              y: (e.clientY - r.top - r.height / 2) * 0.35,
              duration: 0.4,
              ease: "power3.out",
            });
          };
          const leave = () => gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
          b.addEventListener("mousemove", move);
          b.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            b.removeEventListener("mousemove", move);
            b.removeEventListener("mouseleave", leave);
          });
        });
      }
    }, root);

    /* Photos change the page height as they arrive, which moves every
       pin and trigger. Recalculate once everything has loaded. */
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      root.removeEventListener("click", onAnchor);
      cleanups.forEach((fn) => fn());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
