"use client";

import { HeroSplit as SharedHeroSplit } from "@/components/sections/HeroSplit";
import { Dashboard } from "./Dashboard";
import { cn } from "@/lib/utils";

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
  return (
    <div className="relative">
      <SharedHeroSplit
        className={cn("relative")}
        heading={{
          text: "Manage Your Entire Business From One Powerful Dashboard",
          className:
            "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-inter text-[var(--heading-fg)]",
        }}
        subheading={{
          text: "Stop switching between 12 different apps. DashFlow combines project management, analytics, team chat, and customer insights in one beautiful interface.",
          className:
            "text-base md:text-lg mt-6 mb-8 max-w-2xl font-inter font-normal text-[var(--subheading-fg)]",
        }}
        section={{
          className:
            "relative pt-1 px-8 pb-8 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg)]",
        }}
        cta1={{
          label: "Start Free Trial",
          href: "#contact",
          variant: "default",
          size: "lg",
          className: [
            "text-base font-semibold font-inter shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 px-8 py-3",
            "[--btn-bg:theme(colors.sky.600)]",
            "hover:[--btn-hover-bg:theme(colors.sky.700)]",
            "[--btn-fg:theme(colors.white)]",
            "hover:[--btn-hover-fg:theme(colors.white)]",
          ].join(" "),
        }}
        cta2={{
          label: "Watch demo",
          href: "#demo",
          variant: "outline",
          size: "lg",
          className: [
            "text-base font-semibold font-inter shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 px-8 py-3",
            "[--btn-fg:theme(colors.sky.600)]",
            "[--btn-border:theme(colors.sky.600)]",
            "hover:[--btn-hover-bg:theme(colors.sky.50)]",
            "hover:[--btn-hover-fg:theme(colors.sky.600)]",
            "dark:[--btn-fg:theme(colors.sky.500)]",
            "dark:[--btn-border:theme(colors.sky.500)]",
            "dark:hover:[--btn-hover-bg:theme(colors.sky.950)]",
            "dark:hover:[--btn-hover-fg:theme(colors.sky.500)]",
          ].join(" "),
        }}
        image={{ src: undefined, alt: "Dashboard preview" }}
        imageLayout="padded"
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative w-[min(100%,720px)] overflow-hidden rounded-xl bg-white p-0 p-1 opacity-100 md:pt-8 lg:pt-1 dark:bg-blue-950">
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
            "pl-0 relative self-start md:self-start md:flex-none md:shrink-0 w-full h-[24rem] sm:h-[32rem] md:h-[34rem] lg:h-[33rem] md:w-1/2 mb-0 md:mb-0 lg:mb-0 opacity-100",
          // "relative self-start md:self-start md:flex-none md:shrink-0 w-full h-[24rem] sm:h-[26rem] md:h-[28rem] md:w-1/2 mb-6 md:mb-0",
        }}
        textContainer={{ className: "flex-1 p-5 lg:p-8" }}
        buttonsContainer={{
          className: [
            "flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start",
            "[--btn-ring:theme(colors.sky.500)]",
            "dark:[--btn-ring:theme(colors.sky.400)]",
          ].join(" "),
        }}
        textAlign="center"
        ariaLabel="DashFlow hero section"
      />
    </div>
  );
}
