"use client";

import React from "react";

/**
 * NetworkPattern
 * Tailwind-based animated network background for hero fallbacks.
 * Lightweight and dependency-free (no Chakra).
 */
export const NetworkPattern: React.FC = () => {
  return (
    // <div className="relative h-full w-full">
    <div className="relative h-full w-full overflow-hidden">
      {/* Ambient gradient blobs behind the network */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="absolute top-14 right-1/3 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -bottom-10 left-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Main SVG network pattern */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 520"
        className="absolute top-0 left-0 [transform:scale(1.12)]"
      >
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
            <stop offset="100%" stopColor="#2563EB" stopOpacity={1} />
          </linearGradient>

          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.28} />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.28} />
          </linearGradient>
        </defs>

        {/* Subtle grid for depth */}
        <g className="opacity-30">
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={520}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 45}
              x2={900}
              y2={i * 45}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Connection Lines */}
        <g>
          <line
            x1="120"
            y1="80"
            x2="320"
            y2="180"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <line
            x1="320"
            y1="180"
            x2="600"
            y2="140"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="140"
            x2="720"
            y2="340"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <line
            x1="320"
            y1="180"
            x2="420"
            y2="420"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <line
            x1="120"
            y1="80"
            x2="220"
            y2="320"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <line
            x1="220"
            y1="320"
            x2="420"
            y2="420"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />

          <line
            x1="60"
            y1="260"
            x2="120"
            y2="80"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
          />
          <line
            x1="420"
            y1="420"
            x2="580"
            y2="470"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
          />
          <line
            x1="600"
            y1="140"
            x2="780"
            y2="80"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
          />
          <line
            x1="320"
            y1="180"
            x2="540"
            y2="260"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
          />
          <line
            x1="220"
            y1="320"
            x2="540"
            y2="260"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
          />
        </g>

        {/* Network Nodes */}
        <g>
          <circle
            cx="320"
            cy="180"
            r="12"
            fill="url(#nodeGradient)"
            className="pulse-node"
          >
            <animate
              attributeName="r"
              values="12;15;12"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="600"
            cy="140"
            r="10"
            fill="url(#nodeGradient)"
            className="pulse-node"
          >
            <animate
              attributeName="r"
              values="10;13;10"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="120" cy="80" r="8" fill="#3B82F6" className="pulse-node">
            <animate
              attributeName="r"
              values="8;11;8"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="420" cy="420" r="8" fill="#3B82F6" className="pulse-node">
            <animate
              attributeName="r"
              values="8;11;8"
              dur="4.5s"
              begin="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="720" cy="340" r="8" fill="#3B82F6" className="pulse-node">
            <animate
              attributeName="r"
              values="8;11;8"
              dur="3.8s"
              begin="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="220" cy="320" r="8" fill="#3B82F6" className="pulse-node">
            <animate
              attributeName="r"
              values="8;11;8"
              dur="4.2s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="60" cy="260" r="5" fill="#60A5FA" className="pulse-node">
            <animate
              attributeName="r"
              values="5;7;5"
              dur="5s"
              begin="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="580" cy="470" r="5" fill="#60A5FA" className="pulse-node">
            <animate
              attributeName="r"
              values="5;7;5"
              dur="5.5s"
              begin="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="780" cy="80" r="5" fill="#60A5FA" className="pulse-node">
            <animate
              attributeName="r"
              values="5;7;5"
              dur="4.8s"
              begin="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Extra tiny detail nodes */}
          <circle cx="200" cy="100" r="3" fill="#93C5FD" />
          <circle cx="380" cy="200" r="3" fill="#93C5FD" />
          <circle cx="150" cy="320" r="3" fill="#93C5FD" />
          <circle cx="500" cy="260" r="3" fill="#93C5FD" />
          <circle cx="660" cy="220" r="3" fill="#93C5FD" />
          <circle cx="740" cy="420" r="3" fill="#93C5FD" />
        </g>
      </svg>

      {/* Component-scoped CSS for subtle effects */}
      <style jsx>{`
        .pulse-node {
          filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.3));
        }

        @keyframes slow-pan {
          0% {
            transform: scale(1.08) translateY(0px);
          }
          50% {
            transform: scale(1.1) translateY(-6px);
          }
          100% {
            transform: scale(1.08) translateY(0px);
          }
        }

        svg {
          animation: slow-pan 18s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          svg {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
};
