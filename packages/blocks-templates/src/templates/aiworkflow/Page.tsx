import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBadges } from "./components/TrustBadges";
import { Features } from "./components/Features";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

import { PresetThemeVars } from "./PresetThemeVars";

export function AIWorkflowPage() {
  return (
    <PresetThemeVars>
      <div>
        <Navbar />
        <section id="home">
          <Hero />
        </section>
        <TrustBadges />
        <section id="features">
          <Features />
          <ProcessTimeline />
        </section>
        <Testimonials />
        <section id="pricing">
          <Pricing />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <CTA />
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </div>
    </PresetThemeVars>
  );
}
