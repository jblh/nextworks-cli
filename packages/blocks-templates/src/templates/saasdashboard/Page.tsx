import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Testimonials } from "./components/Testimonials";
import { TrustBadges } from "./components/TrustBadges";
import { Contact } from "./components/Contact";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";

import { PresetThemeVars } from "./PresetThemeVars";

export function SaaSDashboard() {
  return (
    <PresetThemeVars>
      <div>
        <SmoothScroll />
        <Navbar />
        <section id="home">
          <Hero />
        </section>
        <Features />
        <Testimonials />
        <TrustBadges />
        <section id="pricing">
          <Pricing />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <Footer />
      </div>
    </PresetThemeVars>
  );
}
