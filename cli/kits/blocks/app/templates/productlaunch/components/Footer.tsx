"use client";

import { Footer as SharedFooter } from "@/components/sections/Footer";
import { Twitter, Linkedin, Github, Youtube, Mail } from "lucide-react";

/**
 * Upgraded preset Footer for the Product Launch template wired to the upgraded shared Footer
 */
export function Footer() {
  return (
    <SharedFooter
      id="footer"
      footerBrandName="IntelliOpAI"
      footerNavLinks={[
        {
          heading: "Product",
          links: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "API Documentation", href: "#api-docs" },
            { name: "FAQ", href: "#faq" },
          ],
        },
        {
          heading: "Company",
          links: [
            { name: "About", href: "#about" },
            { name: "Careers", href: "#careers" },
            { name: "Blog", href: "#blog" },
            { name: "Contact", href: "#contact" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { name: "Help Center", href: "#help" },
            { name: "Terms of Service", href: "#terms" },
            { name: "Privacy Policy", href: "#privacy" },
            { name: "System Status", href: "#status" },
          ],
        },
        {
          heading: "Developers",
          links: [
            { name: "API Reference", href: "#api" },
            { name: "SDKs", href: "#sdk" },
            { name: "GitHub", href: "https://github.com", external: true },
            { name: "Community", href: "#community" },
          ],
        },
      ]}
      footerSocialLinks={[
        {
          name: "Twitter",
          icon: Twitter,
          url: "https://twitter.com/intelliopai",
          external: true,
          label: "Follow IntelliOpAI on Twitter",
        },
        {
          name: "LinkedIn",
          icon: Linkedin,
          url: "https://linkedin.com/company/intelliopai",
          external: true,
          label: "Connect with IntelliOpAI on LinkedIn",
        },
        {
          name: "GitHub",
          icon: Github,
          url: "https://github.com/intelliopai",
          external: true,
          label: "View IntelliOpAI on GitHub",
        },
        {
          name: "YouTube",
          icon: Youtube,
          url: "https://youtube.com/@intelliopai",
          external: true,
          label: "Watch IntelliOpAI on YouTube",
        },
        {
          name: "Email",
          icon: Mail,
          url: "mailto:hello@intelliopai.com",
          external: true,
          label: "Contact IntelliOpAI via email",
        },
      ]}
      section={{
        className:
          "w-full bg-white dark:bg-black text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-800",
      }}
      container={{ className: "max-w-7xl mx-auto px-6" }}
      brand={{
        className:
          "text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 font-outfit",
      }}
      brandWrapper={{
        className: "flex flex-col items-start text-left lg:pr-8",
      }}
      navSection={{
        className:
          "flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 pt-10.5 pb-12",
      }}
      navGroup={{
        className: "flex flex-col items-start text-left min-w-[150px] pt-1.5",
      }}
      navHeading={{
        className:
          "font-semibold text-gray-800 dark:text-white mb-4 text-sm uppercase tracking-wider font-inter",
      }}
      navLink={{
        className:
          "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-sm mb-3 font-inter block",
      }}
      socialSection={{
        className:
          "flex items-center justify-center gap-6 py-8 border-t border-gray-200 dark:border-gray-800",
      }}
      socialLink={{
        className:
          "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-110",
      }}
      socialIcon={{ className: "h-6 w-6" }}
      copyright={{
        className:
          "text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800 font-inter",
      }}
      ariaLabel="IntelliOpAI footer"
    />
  );
}
