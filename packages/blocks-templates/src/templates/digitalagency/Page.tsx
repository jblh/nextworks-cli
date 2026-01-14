"use client";

import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Process } from "./components/Process";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Pricing } from "./components/Pricing";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

import { PresetThemeVars } from "./PresetThemeVars";

export function DigitalAgency() {
  return (
    <PresetThemeVars>
      <main>
        <Navbar />
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Process />
        <About />
        <Team />
        <Pricing />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </PresetThemeVars>
  );
}
