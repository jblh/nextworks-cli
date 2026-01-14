"use client";

import React from "react";
import { HeroSplit as SharedHeroSplit } from "@nextworks/blocks-sections";
import { Dashboard } from "./Dashboard";
import { cn } from "@nextworks/blocks-core";

const stats = [
  { value: "$124K", label: "Monthly Revenue" },
  { value: "+23%", label: "Growth Rate" },
  { value: "847", label: "Active Users" },
];

const projects = ["Website Redesign", "Mobile App v2.0", "Marketing Campaign"];

const floatingCards = [
  { position: "card-1", icon: "📊", text: "Real-time Analytics" },
  { position: "card-2", icon: "👥", text: "Team Collaboration" },
];

const activeTab = "Analytics";
const navItems = ["Analytics", "Projects", "Team"];

export function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const dashRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const dash = dashRef.current;
      if (!sec || !dash) return;
      const sr = sec.getBoundingClientRect();
      const dr = dash.getBoundingClientRect();
      sec.style.setProperty("--hole-x", `${dr.left - sr.left}px`);
      sec.style.setProperty("--hole-y", `${dr.top - sr.top}px`);
      sec.style.setProperty("--hole-w", `${dr.width}px`);
      sec.style.setProperty("--hole-h", `${dr.height}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (dashRef.current) ro.observe(dashRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <div className="relative">
      {/* Ambient gradient blobs behind hero */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>
      <div
        ref={sectionRef}
        className="relative before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-white before:via-blue-50 before:to-white before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-composite:exclude] before:[mask-size:auto,var(--hole-w)_var(--hole-h)] before:[mask-position:0_0,var(--hole-x)_var(--hole-y)] before:[mask-repeat:no-repeat] before:content-[''] before:[-webkit-mask-composite:xor] dark:before:from-gray-900 dark:before:via-blue-950/20 dark:before:to-gray-900"
      >
        <SharedHeroSplit
          className={cn("relative")}
          heading={{
            text: "Manage Your Entire Business From One Powerful Dashboard",
            className:
              "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black dark:text-white font-inter",
          }}
          subheading={{
            text: "Stop switching between 12 different apps. DashFlow combines project management, analytics, team chat, and customer insights in one beautiful interface.",
            className:
              "text-base md:text-lg text-gray-700 dark:text-gray-100 mt-6 mb-8 max-w-2xl font-inter font-normal",
          }}
          section={{
            className: "relative bg-none bg-transparent pt-0 px-8 pb-8",
          }}
          cta1={{
            label: "Start Free Trial",
            href: "#contact",
            variant: "default",
            size: "lg",
            className:
              "bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold font-inter shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3",
          }}
          cta2={{
            label: "Watch demo",
            href: "#demo",
            variant: "outline",
            size: "lg",
            className:
              "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950 text-base font-semibold font-inter shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 px-8 py-3",
          }}
          image={{ src: undefined, alt: "Dashboard preview" }}
          imageLayout="padded"
          fallback={
            <div
              ref={dashRef}
              className="relative z-10 flex h-full w-full items-center justify-center pl-0"
            >
              <div className="relative h-full w-[min(100%,720px)] overflow-hidden p-2">
                <Dashboard
                  stats={stats}
                  projects={projects}
                  floatingCards={floatingCards}
                  navItems={navItems}
                  activeTab={activeTab}
                />
              </div>
            </div>
          }
          imageContainer={{
            className:
              "relative self-start md:self-start md:flex-none md:shrink-0 w-full h-[24rem] sm:h-[26rem] md:h-[31rem] md:w-1/2 mb-6 md:mb-0",
            // "relative self-start md:self-start md:flex-none md:shrink-0 w-full h-[24rem] sm:h-[26rem] md:h-[28rem] md:w-1/2 mb-6 md:mb-0",
          }}
          textContainer={{ className: "flex-1 p-5 lg:p-8" }}
          buttonsContainer={{
            className:
              "flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start",
          }}
          textAlign="center"
          ariaLabel="DashFlow hero section"
        />
      </div>
    </div>
  );
}
