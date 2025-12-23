import { Navbar } from "./components/Navbar";
import { CTA } from "./components/CTA";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Pricing } from "./components/Pricing";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Testimonials } from "./components/Testimonials";
import { TrustBadges } from "./components/TrustBadges";
import { Features } from "./components/Features";

export default function ProductLaunchPage() {
  return (
    // <PresetThemeVars>
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <TrustBadges />
      <About />
      <section id="features">
        <Features />
        <ProcessTimeline />
      </section>
      <Testimonials />
      <CTA />
      <section id="pricing">
        <Pricing />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
    // </PresetThemeVars>
  );
}
