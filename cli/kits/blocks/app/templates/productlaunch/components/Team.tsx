"use client";

import { Team as SharedTeam } from "@/components/sections/Team";

/**
 * Product Launch preset for Team wired to the upgraded shared Team component
 */
export function Team() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "Leading AI researcher with 15+ years in machine learning and neural networks. PhD from MIT.",
      avatar: "👩‍🔬",
      socialLinks: [
        { platform: "LinkedIn", url: "#", icon: "💼" },
        { platform: "Twitter", url: "#", icon: "🐦" },
        { platform: "GitHub", url: "#", icon: "💻" },
      ],
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI Engineering",
      bio: "Full-stack AI engineer specializing in scalable ML systems and cloud infrastructure.",
      avatar: "👨‍💻",
      socialLinks: [
        { platform: "LinkedIn", url: "#", icon: "💼" },
        { platform: "GitHub", url: "#", icon: "💻" },
      ],
    },
    {
      name: "Dr. Emily Watson",
      role: "AI Research Director",
      bio: "Expert in natural language processing and computer vision with 12+ years of research experience.",
      avatar: "👩‍🎓",
      socialLinks: [
        { platform: "LinkedIn", url: "#", icon: "💼" },
        { platform: "Twitter", url: "#", icon: "🐦" },
      ],
    },
    {
      name: "Alex Kim",
      role: "AI Product Manager",
      bio: "Strategic leader focused on bringing AI solutions to market with deep understanding of business needs.",
      avatar: "👨‍💼",
      socialLinks: [
        { platform: "LinkedIn", url: "#", icon: "💼" },
        { platform: "Twitter", url: "#", icon: "🐦" },
      ],
    },
  ];

  return (
    <SharedTeam
      teamHeadingText="Meet the AI Experts"
      teamSubheadingText="Our world-class team of AI researchers, engineers, and strategists working to revolutionize your business with cutting-edge artificial intelligence."
      teamMembers={teamMembers}
      section={{
        className: "py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12" }}
      header={{ className: "space-y-16 items-center" }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white text-center font-outfit",
      }}
      subheading={{
        className:
          "text-lg md:text-xl text-gray-600 dark:text-gray-300 opacity-90 leading-relaxed text-center max-w-4xl mx-auto font-inter",
      }}
      grid={{
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full",
      }}
      card={{
        className:
          "bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group border border-gray-200 dark:border-gray-700",
      }}
      cardContent={{ className: "flex flex-col items-center space-y-6" }}
      avatar={{
        className:
          "text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300",
      }}
      name={{
        className:
          "text-lg md:text-xl font-bold text-gray-800 dark:text-white font-outfit group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300",
      }}
      role={{
        className:
          "text-base font-semibold text-purple-600 dark:text-purple-400 font-inter",
      }}
      bio={{
        className:
          "text-sm md:text-base text-gray-600 dark:text-gray-300 opacity-90 leading-relaxed font-inter",
      }}
      socialLinks={{ className: "flex gap-4 mt-4" }}
      socialLink={{
        className:
          "text-xl text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200 hover:scale-110 transform",
      }}
      ariaLabel="IntelliOpAI team section"
    />
  );
}
