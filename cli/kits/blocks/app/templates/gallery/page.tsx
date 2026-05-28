"use client";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { HeroProductDemo } from "@/components/sections/HeroProductDemo";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { HeroOverlay } from "@/components/sections/HeroOverlay";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { Navbar } from "@/components/sections/Navbar";
import { Newsletter } from "@/components/sections/Newsletter";
import { PortfolioSimple } from "@/components/sections/PortfolioSimple";
import { Pricing } from "@/components/sections/Pricing";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { ThemeSelector } from "@/components/ui/theme-selector";
import type { HeroProductDemoProps } from "@/components/sections/HeroProductDemo";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PresetThemeVars } from "./PresetThemeVars";

export default function Gallery() {
  const defaultFeaturesData = [
    {
      imageSrc: "/placeholders/gallery/pexels-googledeepmind-25626431.jpg",
      imageAlt: "Advanced Analytics Dashboard",
      headingText: "Advanced Analytics",
      subheadingText:
        "Get deep insights into your business performance with our comprehensive analytics dashboard that tracks key metrics and provides actionable recommendations.",
    },
    {
      imageSrc: "/placeholders/gallery/pexels-googledeepmind-25626432.jpg",
      imageAlt: "Real-time Collaboration Tools",
      headingText: "Real-time Collaboration",
      subheadingText:
        "Work seamlessly with your team using our real-time collaboration tools that keep everyone in sync and boost productivity across all projects.",
    },
    {
      imageSrc: "/placeholders/gallery/pexels-googledeepmind-25626434.jpg",
      imageAlt: "Secure Data Management",
      headingText: "Secure Data Management",
      subheadingText:
        "Protect your sensitive information with enterprise-grade security features including encryption, access controls, and compliance monitoring.",
    },
    {
      imageSrc: "/placeholders/gallery/pexels-googledeepmind-25626436.jpg",
      imageAlt: "Mobile-First Design",
      headingText: "Mobile-First Design",
      subheadingText:
        "Access your data and manage your workflow from anywhere with our responsive, mobile-optimized interface that works perfectly on all devices.",
    },
  ];

  const heroProductDemoScenarios: NonNullable<
    HeroProductDemoProps["stage"]
  >["scenarios"] = [
    {
      key: "gallery-product-demo",
      label: "Product demo",
      description:
        "A full-width mockup that keeps the layered agent workspace readable at a glance.",
      activeWindow: "workflowStudio",
      playback: {
        workflowStudio: {
          playbackStepDurationsMs: [820, 920, 1240, 1100, 960, 840, 1560],
          playbackResetDelayMs: 2200,
        },
        runConsole: {
          playbackStepDurationsMs: [1080, 1320, 920, 780, 700, 620, 1240],
          playbackResetDelayMs: 2200,
          playbackStepEntryIndices: [0, 0, 1, 1, 2, 2, 2, 3, 3],
          playbackStepVisibleLineCounts: [2, 2, 3, 4, 6, 8, 10, 12, 12],
        },
      },
      taskList: {
        window: {
          key: "taskList",
          title: "Scenes",
          subtitle: "Gallery preview",
          status: { label: "Ready", tone: "info" },
        },
        title: "Demo scenes",
        subtitle: "Pick a scenario to preview the product story.",
        activeItemId: "gallery-product-demo",
        items: [
          {
            id: "gallery-product-demo",
            title: "Product demo hero",
            description:
              "Show a clean, layered overview with readable workflow windows.",
            meta: "gallery · active",
          },
        ],
      },
      workflowStudio: {
        window: {
          key: "workflowStudio",
          title: "Agent workspace",
          subtitle: "Mockup flow",
          status: { label: "Drafting", tone: "info" },
        },
        title: "Shaping the hero copy",
        subtitle:
          "The demo stays legible while still feeling like a live product workflow.",
        activeNodeId: "polish-layout",
        transcript: [
          { id: "gallery-title", kind: "title", text: "Product demo hero" },
          {
            id: "gallery-prompt",
            kind: "prompt",
            text: "Create a readable gallery hero that highlights a layered product demo without overwhelming the layout.",
          },
          {
            id: "gallery-read-1",
            kind: "activity",
            text: "Read gallery/page.tsx",
          },
          {
            id: "gallery-read-2",
            kind: "activity",
            text: "Inspect HeroProductDemo window layout",
          },
          {
            id: "gallery-thought",
            kind: "thought",
            text: "Keep the shell airy and the text compact for fast scanning",
          },
          {
            id: "gallery-message",
            kind: "message",
            text: "I'll keep the hero copy concise, open up the demo shell, and use the gallery theme tokens so the panels remain easy to read.",
          },
          {
            id: "gallery-file-1",
            kind: "file",
            path: "cli/kits/blocks/app/templates/gallery/page.tsx",
            text: "cli/kits/blocks/app/templates/gallery/page.tsx",
            added: 22,
            removed: 4,
          },
          {
            id: "gallery-summary",
            kind: "message",
            text: "Done. The hero now leads the gallery with a readable mockup and a clear product story.",
          },
        ],
        composer: {
          placeholder: "Plan the next gallery section...",
          modeLabel: "Agent",
          modelLabel: "Sonnet",
        },
        highlights: [
          { id: "read-copy", label: "Read copy", tone: "info" },
          { id: "polish-layout", label: "Polish layout", tone: "accent" },
        ],
        nodes: [
          {
            id: "read-copy",
            label: "Draft concise copy",
            description:
              "Keep the headline short and the subheading scannable.",
            type: "Read",
            status: "success",
            metadata: "headline + subheading",
          },
          {
            id: "layout-shell",
            label: "Open up the shell",
            description: "Give the demo area enough space to stay readable.",
            type: "Analyze",
            status: "success",
            metadata: "demoContainer spacing",
          },
          {
            id: "polish-layout",
            label: "Polish hero layout",
            description:
              "Balance the mockup with the rest of the gallery page.",
            type: "Edit",
            status: "info",
            active: true,
            emphasized: true,
            metadata: "section + container classes",
          },
          {
            id: "review-story",
            label: "Review the story",
            description:
              "Confirm the copy reads like a product preview, not a spec sheet.",
            type: "Verify",
            status: "neutral",
            metadata: "final pass",
          },
        ],
      },
      runConsole: {
        window: {
          key: "runConsole",
          title: "Editor",
          subtitle: "Live mockup",
          status: { label: "Updating", tone: "info" },
        },
        title: "cli/kits/blocks/app/templates/gallery/page.tsx",
        subtitle: "The mockup copy updates as the hero is composed.",
        statusLabel: "Applying gallery hero",
        progressLabel: "12 lines changed",
        progressPercent: 64,
        activeEntryId: "gallery-diff-3",
        editorTabLabel: "page.tsx",
        editorLanguage: "TypeScript",
        editorSummary:
          "Add a readable product demo hero above the rest of the gallery sections.",
        entries: [
          {
            id: "gallery-diff-1",
            message: "Opened gallery page and reviewed hero slots",
            timestamp: "10:48",
            source: "agent",
            status: "success",
          },
          {
            id: "gallery-diff-2",
            message: "Drafted compact mockup copy for the demo hero",
            timestamp: "10:49",
            source: "analysis",
            status: "success",
            detail: "Keeping the headline short preserves the layout balance.",
          },
          {
            id: "gallery-diff-3",
            message: "Wiring HeroProductDemo into the gallery template",
            timestamp: "10:49",
            source: "editor",
            status: "info",
            highlighted: true,
            lineNumber: "34",
            code: [
              " const heroProductDemoScenarios = [",
              "   {",
              "     key: 'gallery-product-demo',",
              "     label: 'Product demo',",
              "     description: 'A full-width mockup that keeps the layered agent workspace readable at a glance.',",
              "   },",
              " ]",
              " ",
              "+<HeroProductDemo",
              "+  heading={{ text: 'Preview your product in motion.' }}",
              "+  subheading={{ text: 'A layered mockup that stays readable inside the gallery.' }}",
              "+  stage={{ scenarios: heroProductDemoScenarios }}",
              "+  demoBelowText",
              "+/>",
            ],
          },
          {
            id: "gallery-diff-4",
            message: "Validated the hero renders cleanly above the other demos",
            timestamp: "10:50",
            source: "preview",
            status: "neutral",
          },
        ],
        metrics: [
          { id: "gm1", label: "Files", value: "1", tone: "success" },
          { id: "gm2", label: "Edits", value: "12", tone: "info" },
          { id: "gm3", label: "Readability", value: "High", tone: "success" },
        ],
        highlights: [],
      },
      approvalInbox: {
        window: {
          key: "approvalInbox",
          title: "Hidden",
        },
        items: [],
      },
      knowledgePanel: {
        window: {
          key: "knowledgePanel",
          title: "Knowledge",
          subtitle: "Preview",
          status: { label: "Ready", tone: "success" },
        },
        title: "Mockup copy",
        subtitle: "The gallery hero stays concise and easy to scan.",
        query: "HeroProductDemo",
        summary:
          "A product demo hero with short positioning copy, a readable shell, and a gallery-friendly layout.",
        snippets: [
          {
            id: "gallery-snippet",
            title: "Gallery hero copy",
            excerptLabel: "Live preview",
            confidence: "1 readable scenario",
            highlighted: true,
            content:
              "heading: 'Preview your product in motion.'\nsubheading: 'A layered mockup that stays readable inside the gallery.'\ncta: 'Explore the gallery'",
            tags: ["hero", "mockup", "gallery"],
          },
        ],
        highlights: [
          { id: "gallery-snippet", label: "Generated copy", tone: "success" },
        ],
      },
      highlights: [
        { id: "polish-layout", label: "Readable hero", tone: "accent" },
        { id: "gallery-diff-3", label: "Mockup updates", tone: "info" },
      ],
    },
  ];

  const BrandNode = (
    <>
      <ThemeSelector ariaLabel="Demo: Color theme" label="" className="mr-2" />

      {/* <ThemeSelector /> */}
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 text-xs font-bold text-white shadow-sm dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 dark:text-zinc-900">
        NW
      </div>
    </>
  );

  return (
    <PresetThemeVars>
      <div className="component-gallery">
        {/* Navigation */}
        <Navbar
          container={{ className: "max-w-7xl mx-auto" }}
          mobileMenu={{
            className: "border-t border-border md:block lg:hidden",
          }}
          desktopMenu={{
            className:
              "hidden md:hidden lg:flex items-center space-x-1 lg:space-x-0",
          }}
          id="site-navigation"
          brand="Nextworks"
          brandNode={BrandNode}
          menuItems={[
            { label: "Hero", href: "#hero-product-demo" },

            { label: "Trust", href: "#trust" },
            { label: "Features", href: "#features" },
            { label: "About", href: "#about-process" },
            { label: "Work", href: "#portfolio-team" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "CTA", href: "#cta" },
            { label: "Contact", href: "#contact" },
          ]}
          links={{
            className:
              "text-base font-normal text-foreground hover:text-gray-500 dark:hover:text-gray-400 transition-colors",
          }}
          ctaButton={null}
        />
        {/* Hero Preview */}
        <div id="hero-product-demo" className="scroll-mt-16">
          <HeroProductDemo
            className="bg-transparent"
            heading={{
              text: "Preview your product in motion.",
              className:
                "max-w-4xl text-left font-outfit text-3xl font-semibold leading-none tracking-tight text-[var(--heading-fg)] sm:text-4xl lg:text-5xl",
            }}
            subheading={{
              text: "A layered mockup that stays readable inside the gallery, with the demo shell wide enough to scan at a glance.",
              className:
                "mt-3 max-w-2xl text-left font-inter text-sm leading-6 text-[var(--subheading-fg)] sm:text-base",
            }}
            cta1={{
              label: "Explore the gallery",
              href: "#features",
              variant: "default",
              size: "lg",
              className:
                "px-7 py-3 text-sm font-semibold shadow-lg shadow-black/10 dark:shadow-black/30 " +
                "[--btn-bg:var(--hero-cta-primary-bg)] " +
                "hover:[--btn-hover-bg:var(--hero-cta-primary-hover-bg)] " +
                "[--btn-fg:var(--hero-cta-primary-fg)] " +
                "hover:[--btn-hover-fg:var(--hero-cta-primary-hover-fg)]",
            }}
            cta2={{
              label: "View the other sections",
              href: "#trust",
              variant: "outline",
              size: "lg",
              className:
                "border px-7 py-3 text-sm font-semibold shadow-sm dark:shadow-black/20 " +
                "[--btn-bg:var(--hero-cta-secondary-bg)] " +
                "[--btn-fg:var(--hero-cta-secondary-fg)] " +
                "[--btn-border:var(--hero-cta-secondary-border)] " +
                "hover:[--btn-hover-bg:var(--hero-cta-secondary-hover-bg)] " +
                "hover:[--btn-hover-fg:var(--hero-cta-secondary-hover-fg)]",
            }}
            stage={{
              scenarios: heroProductDemoScenarios,
              initialScenarioIndex: 0,
              className: "mt-0",
            }}
            section={{
              className: "px-6 pt-10 pb-6 sm:px-8 lg:px-10 lg:pt-12 lg:pb-8",
            }}
            container={{
              className: "relative z-10 max-w-7xl gap-8",
            }}
            textContainer={{
              className: "max-w-3xl pt-1 lg:pl-4 lg:pt-0",
            }}
            demoContainer={{
              className:
                "relative mt-2 min-h-[34rem] w-full max-w-full overflow-hidden rounded-[2rem] border border-border/70 bg-background/90 p-3 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.24)] backdrop-blur-sm lg:h-[clamp(34rem,calc(100svh-8rem),46rem)] lg:min-h-0 lg:px-4",
            }}
            buttonsContainer={{
              className:
                "mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center [--btn-ring:var(--ring)]",
            }}
            demoBelowText
            ariaLabel="Gallery product demo hero section"
          />
        </div>
        {/* Hero Sections */}
        <div id="hero-sections" className="scroll-mt-16">
          <HeroMotion
            actions={{
              className:
                "mt-8 flex items-center justify-center gap-3 [--btn-ring:var(--ring)]",
            }}
            primaryButtonStyle={{
              size: "lg",
              variant: "default",
              className:
                "[--btn-bg:var(--primary)] [--btn-fg:var(--primary-foreground)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:[--btn-hover-fg:var(--primary-foreground)]",
            }}
            secondaryButtonStyle={{
              size: "lg",
              variant: "outline",
              className:
                "border [&:where(button)]:border " +
                "[--btn-bg:transparent] dark:[--btn-bg:transparent] " +
                "[--btn-fg:var(--primary)] dark:[--btn-fg:var(--primary)] " +
                "[--btn-border:var(--primary)] dark:[--btn-border:var(--primary)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_15%,transparent)] " +
                "dark:hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_18%,transparent)] " +
                "hover:[--btn-hover-fg:var(--primary)] dark:hover:[--btn-hover-fg:var(--primary)]",
            }}
            primaryCta={{ label: "Get Started", href: "#hero-sections" }}
            secondaryCta={{ label: "See Demo", href: "#hero-sections" }}
          />
          <HeroOverlay
            heading="Forecast The Next Move"
            subheading="Predict demand, personalize journeys, and scale impact with AI-guided insights your team can use today."
            cta1={{
              label: "Try It Free",
              href: "#hero-sections",
              className:
                "[--btn-bg:var(--primary)] [--btn-fg:var(--primary-foreground)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:[--btn-hover-fg:var(--primary-foreground)]",
            }}
            cta2={{
              label: "See Demo",
              href: "#hero-sections",
              className:
                "border [&:where(button)]:border " +
                "[--btn-bg:transparent] dark:[--btn-bg:transparent] " +
                "[--btn-fg:var(--primary)] dark:[--btn-fg:var(--primary)] " +
                "[--btn-border:var(--primary)] dark:[--btn-border:var(--primary)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_15%,transparent)] " +
                "dark:hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_18%,transparent)] " +
                "hover:[--btn-hover-fg:var(--primary)] dark:hover:[--btn-hover-fg:var(--primary)]",
            }}
            // Set ring color on the CTA container so both buttons share it
            ctaContainer={{
              className:
                "flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center [--btn-ring:var(--ring)]",
            }}
            image={{
              src: "/placeholders/gallery/hero-pexels-broken-9945014.avif",
            }}
          />
          <HeroSplit
            heading="Confident Decisions, On Demand"
            subheading="Reliable data when you need it."
            cta1={{
              label: "Start Free Trial",
              href: "#hero-sections",
              className:
                "[--btn-bg:var(--primary)] [--btn-fg:var(--primary-foreground)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:[--btn-hover-fg:var(--primary-foreground)]",
            }}
            cta2={{
              label: "View Sample Report",
              href: "#hero-sections",
              className:
                "border [&:where(button)]:border " +
                "[--btn-bg:transparent] dark:[--btn-bg:transparent] " +
                "[--btn-fg:var(--primary)] dark:[--btn-fg:var(--primary)] " +
                "[--btn-border:var(--primary)] dark:[--btn-border:var(--primary)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_15%,transparent)] " +
                "dark:hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_18%,transparent)] " +
                "hover:[--btn-hover-fg:var(--primary)] dark:hover:[--btn-hover-fg:var(--primary)]",
            }}
            buttonsContainer={{
              className:
                "flex flex-col md:flex-row gap-4 mt-6 [--btn-ring:var(--ring)]",
            }}
            image={{
              src: "/placeholders/gallery/hero-pexels-broken-9945014.avif",
            }}
            imageLayout="full-bleed"
          />
          {/*  */}
        </div>
        {/* Trust & Social Proof */}
        <div id="trust" className="scroll-mt-16">
          <TrustBadges />
        </div>
        {/* Features & Services */}
        <div id="features" className="scroll-mt-16">
          <Features featuresData={defaultFeaturesData}></Features>
          <ServicesGrid />
        </div>
        {/* About & Process */}
        <div id="about-process" className="scroll-mt-16">
          <About animateStats={false} />
          <ProcessTimeline />
        </div>
        {/* Portfolio & Team */}
        <div id="portfolio-team" className="scroll-mt-16">
          <PortfolioSimple />
          <Team />
        </div>
        {/* Testimonials */}
        <div id="testimonials" className="scroll-mt-16">
          <Testimonials />
        </div>
        {/* Pricing */}
        <div id="pricing" className="scroll-mt-16">
          <Pricing />
        </div>
        {/* FAQ */}
        <div id="faq" className="scroll-mt-16">
          <FAQ
            questionButton={{
              className:
                // Distinct, theme-driven gradient tile + brand ring/border
                "bg-gradient-to-r " +
                "from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:from-[color-mix(in_oklab,var(--primary)_92%,black)] " +
                "hover:to-[color-mix(in_oklab,var(--primary)_95%,black)] " +
                "text-[var(--primary-foreground)] p-5 cursor-pointer rounded-lg " +
                "transition-all duration-200 flex items-center justify-between " +
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5 " +
                // define ring/border vars and ensure a visible border if tokens apply
                "[--btn-ring:var(--ring)] [--btn-border:var(--primary)] border [&:where(button)]:border",
            }}
            answer={{
              className:
                "bg-gradient-to-r " +
                "from-[var(--secondary)] to-[color-mix(in_oklab,var(--secondary)_90%,white)] ",
            }}
          />
        </div>
        {/* Call to Action */}
        <div id="cta" className="scroll-mt-16">
          <CTA
            ctaButton={{ label: "Sign Up Now", href: "#contact" }}
            actionsWrapper={{
              className:
                "mt-6 flex flex-col items-center gap-3 sm:flex-row [--btn-ring:var(--ring)]",
            }}
            ctaButtonStyle={{
              variant: "default",
              size: "default",
              className:
                "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 " +
                "[--btn-bg:var(--primary)] [--btn-fg:var(--primary-foreground)] " +
                "hover:[--btn-hover-bg:color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:[--btn-hover-fg:var(--primary-foreground)]",
            }}
          />
        </div>
        {/* Contact */}
        <div id="contact" className="scroll-mt-16">
          <Contact
            submitButtonStyle={{
              variant: "default",
              size: "lg",
              className:
                "w-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 " +
                // Match FAQ question button gradient + brand ring/border
                "bg-gradient-to-r " +
                "from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_88%,black)] " +
                "hover:from-[color-mix(in_oklab,var(--primary)_92%,black)] " +
                "hover:to-[color-mix(in_oklab,var(--primary)_95%,black)] " +
                "text-[var(--primary-foreground)] " +
                "[--btn-ring:var(--ring)] [--btn-border:var(--primary)] border [&:where(button)]:border",
            }}
          />
        </div>
        {/* Newsletter */}
        <div id="newsletter" className="scroll-mt-16">
          <Newsletter
            button={{
              className:
                "!bg-[var(--primary)] hover:!bg-[color-mix(in_oklab,var(--primary)_90%,transparent)] !text-[var(--primary-foreground)] hover:!text-[var(--primary-background)]",
            }}
          />
        </div>
        {/* Footer */}
        <div id="footer">
          <Footer />
        </div>
      </div>
    </PresetThemeVars>
  );
}
