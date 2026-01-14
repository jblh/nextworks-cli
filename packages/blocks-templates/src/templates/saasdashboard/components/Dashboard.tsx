"use client";

import React, { useEffect, useRef, useState } from "react";

type FloatingCard = {
  position: string;
  icon: string;
  text: string;
};

type Stat = {
  value: string;
  label: string;
};

interface DashboardProps {
  stats: Stat[];
  projects: string[];
  floatingCards: FloatingCard[];
  activeTab?: string;
  navItems?: string[];
}

export function Dashboard({
  stats,
  projects,
  floatingCards,
  activeTab = "Analytics",
  navItems = ["Analytics", "Projects", "Team"],
}: DashboardProps) {
  return (
    <div className="relative isolate">
      <DashboardMockup
        stats={stats}
        projects={projects}
        activeTab={activeTab}
        navItems={navItems}
      />

      {floatingCards.map(({ position, icon, text }) => (
        <FloatingCard
          key={position}
          position={position}
          icon={icon}
          text={text}
        />
      ))}

      <style>{`
        .dashboard-mockup {
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        .dashboard-mockup:hover {
          transform: perspective(1000px) rotateY(-2deg) rotateX(2deg);
        }
        .trend-line {
          clip-path: polygon(
            0 100%,
            20% 80%,
            40% 85%,
            60% 60%,
            80% 50%,
            100% 20%
          );
        }
        @keyframes growUp {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes floatAnim {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

function DashboardMockup({
  stats,
  projects,
  activeTab,
  navItems,
}: {
  stats: Stat[];
  projects: string[];
  activeTab?: string;
  navItems?: string[];
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const targetTilt = useRef({ rx: 0, ry: 0 });
  const rafId = useRef<number | null>(null);

  const animate = () => {
    setTilt((prev) => {
      const smoothing = 0.15;
      const nextRx = prev.rx + (targetTilt.current.rx - prev.rx) * smoothing;
      const nextRy = prev.ry + (targetTilt.current.ry - prev.ry) * smoothing;
      return { rx: nextRx, ry: nextRy };
    });
    rafId.current = requestAnimationFrame(animate);
  };

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -6; // rotateX up to ~±3deg
    const ry = (x / rect.width - 0.5) * 6; // rotateY up to ~±3deg
    targetTilt.current = { rx, ry };
    if (rafId.current == null) rafId.current = requestAnimationFrame(animate);
  };

  const handleLeave = () => {
    targetTilt.current = { rx: 0, ry: 0 };
  };

  useEffect(() => {
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);
  return (
    <div
      className={
        "dashboard-mockup transform-gpu rounded-2xl border border-blue-500/20 p-6 shadow-2xl ring-1 ring-blue-500/10 backdrop-blur transition-transform duration-150 ease-out motion-reduce:transition-none " +
        "bg-slate-900/80 dark:bg-slate-900/80"
      }
      style={{
        willChange: "transform",
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <DashboardHeader activeTab={activeTab} navItems={navItems} />
      <DashboardGrid stats={stats} projects={projects} />
    </div>
  );
}

function DashboardHeader({
  activeTab = "Analytics",
  navItems = ["Analytics", "Projects", "Team"],
}: {
  activeTab?: string;
  navItems?: string[];
}) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-blue-500/10 pb-4">
      <div className="text-[1.1rem] font-semibold text-slate-200">
        Business Overview
      </div>
      <div className="hidden gap-3 md:flex">
        {navItems.map((item) => (
          <div
            key={item}
            className={
              "rounded-md px-3 py-2 text-sm " +
              (item === activeTab
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                : "bg-blue-500/10 text-blue-400")
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardGrid({
  stats,
  projects,
}: {
  stats: Stat[];
  projects: string[];
}) {
  return (
    <div className="mb-4 grid grid-cols-[2fr_1fr] gap-4">
      <ChartArea />
      <StatsPanel stats={stats} />
      <ProjectList projects={projects} />
    </div>
  );
}

function ChartArea() {
  const barHeights = [30, 45, 35, 60, 55, 75, 70, 85, 90, 100];
  return (
    <div className="relative overflow-hidden rounded-lg border border-blue-500/10 bg-slate-900/50 p-4">
      <div className="mb-2 text-sm text-slate-300">Revenue Growth</div>
      <div
        className="relative h-32 overflow-hidden rounded-md"
        style={{
          background:
            "linear-gradient(45deg, transparent 20%, rgba(59,130,246,0.1) 20%, rgba(59,130,246,0.1) 40%, transparent 40%, transparent 60%, rgba(139,92,246,0.1) 60%, rgba(139,92,246,0.1) 80%, transparent 80%)",
        }}
      >
        <div className="absolute inset-[10px] flex items-end gap-[3px]">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-b from-blue-500 to-purple-500"
              style={{
                minHeight: "20px",
                height: `${h}%`,
                animation: "growUp 2s ease-out both",
                animationDelay: `${(i + 1) * 0.1}s`,
              }}
            />
          ))}
        </div>
        <div className="trend-line absolute top-5 right-[5%] left-[5%] h-[2px] rounded bg-gradient-to-r from-emerald-500 to-blue-500 opacity-80" />
      </div>
    </div>
  );
}

function StatsPanel({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col gap-2">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-lg border border-blue-500/10 bg-slate-900/50 p-3"
        >
          <div className="text-lg font-bold text-blue-500">{s.value}</div>
          <div className="text-[0.7rem] text-slate-400 uppercase">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectList({ projects }: { projects: string[] }) {
  return (
    <div className="col-span-2 rounded-lg border border-blue-500/10 bg-slate-900/50 p-4">
      <div className="mb-2 text-sm text-slate-300">Active Projects</div>
      <div className="flex flex-wrap gap-2">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-purple-500/10 px-2 py-2 text-[0.8rem] text-slate-200"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingCard({ position, icon, text }: FloatingCard) {
  const positionClasses =
    position === "card-1"
      ? "top-[10%] right-[6%]"
      : position === "card-2"
        ? "bottom-[20%] left-[2%]"
        : "top-0 left-0";

  return (
    <div
      className={[
        "absolute z-10 transform-gpu rounded-lg border border-blue-500/20 p-4 shadow-lg",
        "animate-[floatAnim_6s_ease-in-out_infinite]",
        "bg-slate-800 dark:bg-slate-900",
        positionClasses,
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <div className="mb-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-sm text-white">
        {icon}
      </div>
      <div className="text-sm text-slate-300">{text}</div>
    </div>
  );
}
