// - /app/templates/gallery/page.tsx

"use client";

import {
  About,
  Contact,
  CTA,
  FAQ,
  Features,
  Footer,
  HeroMotion,
  HeroOverlay,
  HeroSplit,
  Navbar,
  Newsletter,
  PortfolioSimple,
  Pricing,
  ProcessTimeline,
  ServicesGrid,
  Team,
  Testimonials,
  TrustBadges,
} from "@nextworks/blocks-sections";

import { ThemeSelector } from "@nextworks/blocks-core";

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
            { label: "Hero", href: "#hero-sections" },
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
        {/* Hero Sections */}
        <div id="hero-sections">
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
              // Outline CTA should be transparent bg, primary fg/border, with subtle hover bg
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
