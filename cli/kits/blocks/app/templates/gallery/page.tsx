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
      label: "Workflow overview",
      description:
        "An AI-powered coding agent that plans, edits, and verifies changes across your entire codebase — without breaking your flow.",
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
          title: "Queues",
          subtitle: "Active tasks",
          status: { label: "Ready", tone: "info" },
        },
        title: "Task queues",
        subtitle: "Switch between in-progress agent runs.",
        activeItemId: "gallery-product-demo",
        items: [
          {
            id: "gallery-product-demo",
            title: "Refactor auth module",
            description:
              "Extract token logic into a dedicated service, add refresh handling, and update all call sites.",
            meta: "in progress · 4 files",
          },
        ],
      },
      workflowStudio: {
        window: {
          key: "workflowStudio",
          title: "Agent console",
          subtitle: "Live run",
          status: { label: "Running", tone: "info" },
        },
        title: "Refactoring auth module",
        subtitle:
          "The agent reads existing logic, plans the extraction, and applies changes across all affected files.",
        activeNodeId: "polish-layout",
        transcript: [
          { id: "gallery-title", kind: "title", text: "Refactor auth module" },
          {
            id: "gallery-prompt",
            kind: "prompt",
            text: "Extract token handling into an AuthService class, add silent refresh on 401, and update every call site.",
          },
          {
            id: "gallery-read-1",
            kind: "activity",
            text: "Read auth/session.ts and api/client.ts",
          },
          {
            id: "gallery-read-2",
            kind: "activity",
            text: "Scan for token usage across 12 files",
          },
          {
            id: "gallery-file-1",
            kind: "file",
            path: "src/services/auth-service.ts",
            text: "src/services/auth-service.ts",
            added: 74,
            removed: 0,
          },
          {
            id: "gallery-summary",
            kind: "message",
            text: "Done. Token logic is centralised in AuthService and silent refresh is active on every API call.",
          },
        ],
        composer: {
          placeholder: "Describe your next change...",
          modeLabel: "Agent",
          modelLabel: "Sonnet",
        },
        highlights: [
          { id: "read-copy", label: "Read codebase", tone: "info" },
          { id: "polish-layout", label: "Apply changes", tone: "accent" },
        ],
        nodes: [
          {
            id: "read-copy",
            label: "Read existing auth logic",
            description:
              "Parse session handling and identify all token read/write paths.",
            type: "Read",
            status: "success",
            metadata: "auth/session.ts · api/client.ts",
          },
          {
            id: "layout-shell",
            label: "Plan the extraction",
            description:
              "Decide class boundaries and map which call sites need updating.",
            type: "Analyze",
            status: "success",
            metadata: "12 files affected",
          },
          {
            id: "polish-layout",
            label: "Write AuthService",
            description:
              "Create the service class, move token storage, and add the 401 refresh interceptor.",
            type: "Edit",
            status: "info",
            active: true,
            emphasized: true,
            metadata: "src/services/auth-service.ts",
          },
          {
            id: "review-story",
            label: "Update call sites",
            description:
              "Replace direct token access with AuthService across all affected files and verify types.",
            type: "Verify",
            status: "neutral",
            metadata: "final pass",
          },
        ],
      },
      runConsole: {
        window: {
          key: "runConsole",
          title: "Console",
          subtitle: "Live output",
          status: { label: "Writing", tone: "info" },
        },
        title: "src/services/auth-service.ts",
        subtitle:
          "New file — token logic extracted from session.ts and api/client.ts.",
        statusLabel: "Writing AuthService",
        progressLabel: "74 lines added",
        progressPercent: 64,
        activeEntryId: "gallery-diff-3",
        editorTabLabel: "auth-service.ts",
        editorLanguage: "TypeScript",
        editorSummary:
          "Create AuthService with token storage, silent refresh, and a fetch interceptor.",
        entries: [
          {
            id: "gallery-diff-1",
            message: "Read auth/session.ts and mapped token access patterns",
            timestamp: "10:48",
            source: "agent",
            status: "success",
          },
          {
            id: "gallery-diff-2",
            message: "Identified 12 call sites that reference tokens directly",
            timestamp: "10:49",
            source: "analysis",
            status: "success",
            detail:
              "Centralising access in AuthService will eliminate all direct imports.",
          },
          {
            id: "gallery-diff-3",
            message: "Created AuthService with refresh interceptor",
            timestamp: "10:49",
            source: "editor",
            status: "info",
            highlighted: true,
            lineNumber: "34",
            code: [
              " export class AuthService {",
              "   private static token: string | null = null;",
              " ",
              "+  static async getToken(): Promise<string | null> {",
              "+    if (!this.token) this.token = await storage.get('auth_token');",
              "+    return this.token;",
              "+  }",
              "+ ",
              "+  static async refreshIfExpired(): Promise<void> {",
              "+    const exp = parseExpiry(this.token);",
              "+    if (exp && exp < Date.now() + 60_000) {",
              "+      this.token = await api.post('/auth/refresh');",
              "+    }",
              "+  }",
            ],
          },
          {
            id: "gallery-diff-4",
            message: "Queued call-site updates across 12 files",
            timestamp: "10:50",
            source: "preview",
            status: "neutral",
          },
        ],
        metrics: [
          { id: "gm1", label: "Files", value: "1", tone: "success" },
          { id: "gm2", label: "Lines added", value: "74", tone: "info" },
          { id: "gm3", label: "Type errors", value: "0", tone: "success" },
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
          subtitle: "Context",
          status: { label: "Ready", tone: "success" },
        },
        title: "Auth codebase context",
        subtitle: "Relevant files and patterns surfaced for this task.",
        query: "AuthService token refresh",
        summary:
          "Token storage is currently split between session.ts and api/client.ts. Centralising in AuthService removes 3 duplicate patterns and enables a single refresh intercept point.",
        snippets: [
          {
            id: "gallery-snippet",
            title: "auth/session.ts — token storage",
            excerptLabel: "Current implementation",
            confidence: "12 call sites",
            highlighted: true,
            content:
              "getToken(): string | null { return localStorage.getItem('auth_token'); }\nsetToken(t: string): void { localStorage.setItem('auth_token', t); }\nclearToken(): void { localStorage.removeItem('auth_token'); }",
            tags: ["auth", "token", "session"],
          },
        ],
        highlights: [
          { id: "gallery-snippet", label: "Token pattern", tone: "success" },
        ],
      },
      highlights: [
        { id: "polish-layout", label: "AuthService created", tone: "accent" },
        { id: "gallery-diff-3", label: "Refresh interceptor", tone: "info" },
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
              text: "Ship faster with an agent that knows your codebase.",
              className:
                "max-w-4xl text-left font-outfit text-3xl font-semibold leading-none tracking-tight text-[var(--heading-fg)] sm:text-4xl lg:text-5xl",
            }}
            subheading={{
              text: "Describe the change you need. The agent reads, plans, edits, and verifies — across every affected file, in one run.",
              className:
                "mt-3 max-w-2xl text-left font-inter text-sm leading-6 text-[var(--subheading-fg)] sm:text-base",
            }}
            cta1={{
              label: "Start for free",
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
              label: "See it in action",
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
                "relative mt-2 min-h-[34rem] w-full max-w-full overflow-hidden rounded-[0.5rem] border border-border/0 bg-background/90 p-3 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.24)] backdrop-blur-sm lg:h-[clamp(34rem,calc(100svh-8rem),46rem)] lg:min-h-0 lg:px-4",
              // "relative mt-2 min-h-[34rem] w-full max-w-full overflow-hidden rounded-[2rem] border border-border/70 bg-background/90 p-3 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.24)] backdrop-blur-sm lg:h-[clamp(34rem,calc(100svh-8rem),46rem)] lg:min-h-0 lg:px-4",
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

          <HeroSplit
            section={{ className: "bg-muted" }}
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
          <TrustBadges
            section={{
              className:
                "py-8 px-6 bg-[color-mix(in_oklab,var(--muted)_94%,black)] dark:bg-[color-mix(in_oklab,var(--muted)_90%,white)]",
            }}
          />
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
