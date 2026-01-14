"use client";

import { useEffect } from "react";

// Smoothly scrolls to hash targets with a custom, faster duration (~300ms)
export function SmoothScroll() {
  useEffect(() => {
    let suppressClick = false;

    const animateTo = (href: string) => {
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;

      const navbarOffsetPx = 64; // matches h-16 sticky navbar
      const start = window.scrollY;
      const targetTop =
        el.getBoundingClientRect().top + window.scrollY - navbarOffsetPx;
      const distance = targetTop - start;
      const duration = 300; // ms
      const startTime = performance.now();

      // iOS-like easing
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutQuart(t);
        window.scrollTo(0, start + distance * eased);
        if (t < 1) requestAnimationFrame(step);
        else history.replaceState(null, "", href);
      };

      requestAnimationFrame(step);
    };

    const onPointerDown = (e: Event) => {
      const ev = e as PointerEvent;
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      // Only primary button, no modifiers
      if (
        ev.button !== 0 ||
        ev.metaKey ||
        ev.ctrlKey ||
        ev.altKey ||
        ev.shiftKey
      )
        return;
      e.preventDefault();
      suppressClick = true;
      animateTo(href);
    };

    const onClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      if (suppressClick) {
        e.preventDefault();
        suppressClick = false;
        return;
      }
      e.preventDefault();
      animateTo(href);
    };

    const onKeyDown = (e: Event) => {
      const ev = e as KeyboardEvent;
      if (ev.key !== "Enter" && ev.key !== " ") return;
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      animateTo(href);
    };

    const links = Array.from(
      document.querySelectorAll('a[href^="#"]'),
    ) as HTMLAnchorElement[];
    links.forEach((a) => {
      a.addEventListener("pointerdown", onPointerDown);
      a.addEventListener("click", onClick);
      a.addEventListener("keydown", onKeyDown);
    });
    return () => {
      links.forEach((a) => {
        a.removeEventListener("pointerdown", onPointerDown);
        a.removeEventListener("click", onClick);
        a.removeEventListener("keydown", onKeyDown);
      });
    };
  }, []);

  return null;
}
