/**
 * ScrollEffects.tsx - light scroll animations, added only after the page has hydrated.
 *
 *  - `.rise` / `[data-reveal]` elements fade and slide up as they enter the viewport.
 *  - `[data-count]` numbers count up from 0 the first time they are seen.
 *  - <ReadingProgress /> draws a thin bar showing how far down the page you are.
 *
 * The prerendered HTML is always fully visible: nothing is hidden until JavaScript has run, and
 * anything already on screen at that moment is left alone (no flash, no layout shift). Visitors
 * who ask for reduced motion get no animation at all. Only transform and opacity are animated.
 */
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SELECTOR = ".rise, [data-reveal], [data-stagger] > *";

function reducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || target <= 0) return;
  const suffix = el.dataset.suffix ?? "";
  const started = performance.now();
  const duration = 900;
  const tick = (t: number) => {
    const k = Math.min(1, (t - started) / duration);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = `${Math.round(target * eased).toLocaleString("en-US")}${suffix}`;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function ScrollEffects() {
  const { pathname } = useLocation();
  useParallax();
  // Before the new route paints, switch hiding off until its elements have been checked
  useLayoutEffect(() => {
    document.documentElement.classList.remove("fx-ready");
  }, [pathname]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || reducedMotion()) return;
    const root = document.documentElement;
    let io: IntersectionObserver | undefined;
    // Wait one frame so the new route's content is in the DOM
    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            el.classList.add("is-in");
            if (el.dataset.count) countUp(el);
            io?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(`${SELECTOR}, [data-count]`).forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          el.classList.add("is-in"); // already visible: never hide it
          return;
        }
        io?.observe(el);
      });
      root.classList.add("fx-ready");
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}

/** Gentle parallax for decorative shapes: [data-parallax="0.15"] moves at 15% of the scroll speed */
export function useParallax() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (reducedMotion()) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      for (const el of els) el.style.transform = `translate3d(0, ${(y * Number(el.dataset.parallax || 0.1)).toFixed(1)}px, 0)`;
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);
}

export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const k = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${k})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={bar} className="h-full origin-left bg-brand-600" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
