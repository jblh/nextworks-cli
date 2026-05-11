"use client";

import { HeroProductDemo } from "@/components/sections/HeroProductDemo";
import type { ProductDemoScenario } from "@/components/sections/product-demo/types";

const scenarios: ProductDemoScenario[] = [
  {
    key: "fix-auth-flow",
    label: "Coding agent",
    description:
      "Select a task and watch the agent inspect files, apply changes, and produce the result.",
    activeWindow: "workflowStudio",
    taskList: {
      window: {
        key: "taskList",
        title: "Tasks",
        subtitle: "Agent queue",
        status: { label: "3 open", tone: "info" },
      },
      title: "Open tasks",
      subtitle: "Pick a coding task to inspect and run.",
      activeItemId: "fix-auth-flow",
      items: [
        {
          id: "fix-auth-flow",
          title: "Fix auth flow",
          description: "Resolve broken redirect after OAuth callback.",
          meta: "apps/web / due now",
        },
        {
          id: "refactor-pricing-page",
          title: "Refactor pricing page",
          description: "Split pricing blocks into reusable components.",
          meta: "marketing site / queued",
        },
        {
          id: "ship-command-palette",
          title: "Ship command palette",
          description: "Add keyboard search and action switching.",
          meta: "dashboard / ready",
        },
      ],
    },
    workflowStudio: {
      window: {
        key: "workflowStudio",
        title: "AI agent",
        subtitle: "Working session",
        status: { label: "Thinking", tone: "info" },
      },
      title: "Investigating redirect bug",
      subtitle:
        "The agent reads the auth callback, checks navigation state, and prepares a safe patch.",
      activeNodeId: "edit-callback",
      highlights: [
        { id: "inspect-route", label: "Read files", tone: "info" },
        { id: "edit-callback", label: "Write patch", tone: "accent" },
      ],
      nodes: [
        {
          id: "inspect-route",
          label: "Inspect auth callback",
          description: "Read callback handler and post-login redirect logic.",
          type: "Read",
          status: "success",
          metadata: "app/auth/callback/page.tsx",
        },
        {
          id: "trace-session",
          label: "Trace session state",
          description: "Verify redirect target after token exchange completes.",
          type: "Analyze",
          status: "success",
          metadata: "session + router state",
        },
        {
          id: "edit-callback",
          label: "Patch redirect handling",
          description:
            "Guard empty return paths and preserve intended destination.",
          type: "Edit",
          status: "info",
          active: true,
          emphasized: true,
          metadata: "drafting change set",
        },
        {
          id: "run-checks",
          label: "Run validation",
          description:
            "Check for auth loop regression and invalid destination paths.",
          type: "Verify",
          status: "neutral",
          metadata: "tests next",
        },
      ],
    },
    runConsole: {
      window: {
        key: "runConsole",
        title: "Result",
        subtitle: "File diff",
        status: { label: "Updating", tone: "info" },
      },
      title: "app/auth/callback/page.tsx",
      subtitle: "The output panel updates as the agent writes the patch.",
      statusLabel: "Drafting patch",
      progressLabel: "12 lines changed",
      progressPercent: 68,
      activeEntryId: "diff-3",
      editorTabLabel: "page.tsx",
      editorLanguage: "TypeScript",
      editorSummary:
        "Guard empty return paths and preserve intended destination.",
      entries: [
        {
          id: "diff-1",
          message: "Read callback page and redirect helper",
          timestamp: "11:02",
          source: "agent",
          status: "success",
        },
        {
          id: "diff-2",
          message: "Detected empty redirect path after OAuth completion",
          timestamp: "11:02",
          source: "analysis",
          status: "success",
          detail:
            "Fallback was defaulting too early and dropping intended destination.",
        },
        {
          id: "diff-3",
          message: "Writing guarded redirect with preserved returnTo value",
          timestamp: "11:03",
          source: "editor",
          status: "info",
          highlighted: true,
          lineNumber: "42",
          code: [
            "const safeReturnTo = normalizeReturnTo(searchParams.get('returnTo'))",
            "const destination = safeReturnTo ?? '/dashboard'",
            "router.replace('/dashboard')",
            "router.replace(destination)",
          ],
        },
        {
          id: "diff-4",
          message: "Previewing successful redirect to /dashboard/settings",
          timestamp: "11:03",
          source: "preview",
          status: "neutral",
        },
      ],
      metrics: [
        { id: "m1", label: "Files", value: "2", tone: "success" },
        { id: "m2", label: "Edits", value: "12", tone: "info" },
        { id: "m3", label: "Checks", value: "1/2", tone: "warning" },
      ],
      highlights: [{ id: "diff-3", label: "Live patch", tone: "accent" }],
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
        subtitle: "Preview",
        status: { label: "Ready", tone: "success" },
      },
      title: "Patch preview",
      subtitle: "Show the code the agent is producing right now.",
      query: "page.tsx",
      summary:
        "Redirects now preserve a sanitized returnTo destination and fall back only when needed.",
      snippets: [
        {
          id: "snippet-1",
          title: "Updated callback handler",
          excerptLabel: "Live diff",
          confidence: "12 changed lines",
          highlighted: true,
          content:
            "const safeReturnTo = normalizeReturnTo(searchParams.get('returnTo'))\nconst destination = safeReturnTo ?? '/dashboard'\nrouter.replace(destination)",
          tags: ["redirect", "auth", "callback"],
        },
      ],
      highlights: [
        { id: "snippet-1", label: "Generated code", tone: "success" },
      ],
    },
    highlights: [
      { id: "edit-callback", label: "Active edit", tone: "accent" },
      { id: "diff-3", label: "Result updates", tone: "info" },
    ],
  },
  {
    key: "refactor-pricing-page",
    label: "Coding agent",
    description:
      "Select a task and watch the agent inspect files, apply changes, and produce the result.",
    activeWindow: "workflowStudio",
    taskList: {
      window: {
        key: "taskList",
        title: "Tasks",
        subtitle: "Agent queue",
        status: { label: "3 open", tone: "info" },
      },
      title: "Open tasks",
      subtitle: "Pick a coding task to inspect and run.",
      activeItemId: "refactor-pricing-page",
      items: [
        {
          id: "fix-auth-flow",
          title: "Fix auth flow",
          description: "Resolve broken redirect after OAuth callback.",
          meta: "apps/web / due now",
        },
        {
          id: "refactor-pricing-page",
          title: "Refactor pricing page",
          description: "Split pricing blocks into reusable components.",
          meta: "marketing site / queued",
        },
        {
          id: "ship-command-palette",
          title: "Ship command palette",
          description: "Add keyboard search and action switching.",
          meta: "dashboard / ready",
        },
      ],
    },
    workflowStudio: {
      window: {
        key: "workflowStudio",
        title: "AI agent",
        subtitle: "Working session",
        status: { label: "Planning", tone: "info" },
      },
      title: "Extracting pricing sections",
      subtitle:
        "The agent maps repeated UI, creates reusable blocks, and rewires the page composition.",
      activeNodeId: "create-blocks",
      highlights: [
        { id: "scan-page", label: "Find repetition", tone: "info" },
        { id: "create-blocks", label: "Extract components", tone: "accent" },
      ],
      nodes: [
        {
          id: "scan-page",
          label: "Scan pricing page",
          description: "Detect repeated tier, feature, and CTA structures.",
          type: "Read",
          status: "success",
          metadata: "app/(marketing)/pricing/page.tsx",
        },
        {
          id: "map-sections",
          label: "Map component boundaries",
          description: "Group hero, tiers, FAQ, and comparison table logic.",
          type: "Analyze",
          status: "success",
          metadata: "4 extractable sections",
        },
        {
          id: "create-blocks",
          label: "Create reusable blocks",
          description: "Move repeated JSX into pricing section components.",
          type: "Edit",
          status: "info",
          active: true,
          emphasized: true,
          metadata: "components/pricing/*",
        },
        {
          id: "trim-page",
          label: "Simplify page entry",
          description: "Reduce the page to composition and imported data.",
          type: "Verify",
          status: "neutral",
          metadata: "cleanup pending",
        },
      ],
    },
    runConsole: {
      window: {
        key: "runConsole",
        title: "Result",
        subtitle: "Component output",
        status: { label: "Updating", tone: "info" },
      },
      title: "components/pricing/PricingTiers.tsx",
      subtitle: "The output panel shows the extracted component taking shape.",
      statusLabel: "Extracting UI",
      progressLabel: "3 components created",
      progressPercent: 59,
      activeEntryId: "pricing-3",
      editorTabLabel: "PricingTiers.tsx",
      editorLanguage: "TSX",
      editorSummary:
        "Move repeated pricing JSX into a reusable tiers component.",
      entries: [
        {
          id: "pricing-1",
          message: "Identified repeated tier cards and CTA footer",
          timestamp: "11:11",
          source: "agent",
          status: "success",
        },
        {
          id: "pricing-2",
          message: "Created shared types for pricing tiers and features",
          timestamp: "11:12",
          source: "editor",
          status: "success",
        },
        {
          id: "pricing-3",
          message: "Extracting PricingTiers component and props",
          timestamp: "11:12",
          source: "editor",
          status: "info",
          highlighted: true,
          lineNumber: "18",
          code: [
            "export function PricingTiers({ plans }: PricingTiersProps) {",
            "  return plans.map((plan) => (",
            "    <PricingCard key={plan.name} plan={plan} />",
            "  ))",
            "}",
          ],
        },
        {
          id: "pricing-4",
          message: "Updating page.tsx to compose extracted blocks",
          timestamp: "11:13",
          source: "editor",
          status: "neutral",
        },
      ],
      metrics: [
        { id: "pm1", label: "Files", value: "4", tone: "success" },
        { id: "pm2", label: "Blocks", value: "3", tone: "info" },
        { id: "pm3", label: "Dupes", value: "-38%", tone: "success" },
      ],
      highlights: [
        { id: "pricing-3", label: "Extracted block", tone: "accent" },
      ],
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
        subtitle: "Preview",
        status: { label: "Ready", tone: "success" },
      },
      title: "Component preview",
      subtitle: "Show the extracted UI structure the agent is generating.",
      query: "PricingTiers.tsx",
      summary:
        "The page is being reduced to reusable blocks with shared data and a slimmer entry point.",
      snippets: [
        {
          id: "pricing-snippet",
          title: "Extracted tier component",
          excerptLabel: "Live component",
          confidence: "3 components created",
          highlighted: true,
          content:
            "export function PricingTiers({ plans }: PricingTiersProps) {\n  return plans.map((plan) => <PricingCard key={plan.name} plan={plan} />)\n}",
          tags: ["components", "refactor", "pricing"],
        },
      ],
      highlights: [
        { id: "pricing-snippet", label: "Generated UI", tone: "success" },
      ],
    },
    highlights: [
      { id: "create-blocks", label: "Active extraction", tone: "accent" },
      { id: "pricing-3", label: "Result updates", tone: "info" },
    ],
  },
  {
    key: "ship-command-palette",
    label: "Coding agent",
    description:
      "Select a task and watch the agent inspect files, apply changes, and produce the result.",
    activeWindow: "workflowStudio",
    taskList: {
      window: {
        key: "taskList",
        title: "Tasks",
        subtitle: "Agent queue",
        status: { label: "3 open", tone: "info" },
      },
      title: "Open tasks",
      subtitle: "Pick a coding task to inspect and run.",
      activeItemId: "ship-command-palette",
      items: [
        {
          id: "fix-auth-flow",
          title: "Fix auth flow",
          description: "Resolve broken redirect after OAuth callback.",
          meta: "apps/web / due now",
        },
        {
          id: "refactor-pricing-page",
          title: "Refactor pricing page",
          description: "Split pricing blocks into reusable components.",
          meta: "marketing site / queued",
        },
        {
          id: "ship-command-palette",
          title: "Ship command palette",
          description: "Add keyboard search and action switching.",
          meta: "dashboard / ready",
        },
      ],
    },
    workflowStudio: {
      window: {
        key: "workflowStudio",
        title: "AI agent",
        subtitle: "Working session",
        status: { label: "Building", tone: "info" },
      },
      title: "Adding command palette",
      subtitle:
        "The agent wires shortcut handling, searchable actions, and quick navigation into one flow.",
      activeNodeId: "wire-shortcuts",
      highlights: [
        { id: "inspect-layout", label: "Inspect layout", tone: "info" },
        { id: "wire-shortcuts", label: "Add shortcuts", tone: "accent" },
      ],
      nodes: [
        {
          id: "inspect-layout",
          label: "Inspect app shell",
          description:
            "Find the dashboard layout, nav state, and modal primitives.",
          type: "Read",
          status: "success",
          metadata: "dashboard shell",
        },
        {
          id: "gather-actions",
          label: "Collect command actions",
          description: "Build a searchable list of routes and common actions.",
          type: "Analyze",
          status: "success",
          metadata: "12 candidate commands",
        },
        {
          id: "wire-shortcuts",
          label: "Wire keyboard shortcuts",
          description:
            "Open palette with Cmd+K and route selected actions instantly.",
          type: "Edit",
          status: "info",
          active: true,
          emphasized: true,
          metadata: "keydown + dialog state",
        },
        {
          id: "polish-results",
          label: "Polish result list",
          description:
            "Add grouping, empty state, and active selection feedback.",
          type: "Verify",
          status: "neutral",
          metadata: "UX pass next",
        },
      ],
    },
    runConsole: {
      window: {
        key: "runConsole",
        title: "Result",
        subtitle: "UI output",
        status: { label: "Updating", tone: "info" },
      },
      title: "components/command-menu.tsx",
      subtitle:
        "The output panel shows the new command palette interface being assembled.",
      statusLabel: "Building palette",
      progressLabel: "8 commands wired",
      progressPercent: 73,
      activeEntryId: "cmd-3",
      editorTabLabel: "command-menu.tsx",
      editorLanguage: "TSX",
      editorSummary:
        "Wire a global shortcut and searchable action list into the dashboard shell.",
      entries: [
        {
          id: "cmd-1",
          message: "Found dialog primitive and dashboard nav state",
          timestamp: "11:21",
          source: "agent",
          status: "success",
        },
        {
          id: "cmd-2",
          message: "Generated searchable command list with grouped actions",
          timestamp: "11:22",
          source: "editor",
          status: "success",
        },
        {
          id: "cmd-3",
          message: "Binding Cmd+K to open the command menu globally",
          timestamp: "11:22",
          source: "editor",
          status: "info",
          highlighted: true,
          lineNumber: "27",
          code: [
            "useEffect(() => {",
            "  window.addEventListener('keydown', onKeyDown)",
            "  return () => window.removeEventListener('keydown', onKeyDown)",
            "}, [])",
          ],
        },
        {
          id: "cmd-4",
          message: "Previewing route jump and quick action execution",
          timestamp: "11:23",
          source: "preview",
          status: "neutral",
        },
      ],
      metrics: [
        { id: "cm1", label: "Commands", value: "8", tone: "info" },
        { id: "cm2", label: "Routes", value: "5", tone: "success" },
        { id: "cm3", label: "Shortcut", value: "Cmd+K", tone: "success" },
      ],
      highlights: [{ id: "cmd-3", label: "Shortcut wired", tone: "accent" }],
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
        subtitle: "Preview",
        status: { label: "Ready", tone: "success" },
      },
      title: "Palette preview",
      subtitle: "Show the agent's latest UI output for the command menu.",
      query: "command-menu.tsx",
      summary:
        "A global command palette is being added with grouped actions, shortcut support, and instant route changes.",
      snippets: [
        {
          id: "command-snippet",
          title: "Command menu",
          excerptLabel: "Live UI",
          confidence: "8 commands wired",
          highlighted: true,
          content:
            '<CommandDialog open={open} onOpenChange={setOpen}>\n  <CommandInput placeholder="Search commands" />\n  <CommandList>{groups.map(renderGroup)}</CommandList>\n</CommandDialog>',
          tags: ["command palette", "ux", "keyboard"],
        },
      ],
      highlights: [
        { id: "command-snippet", label: "Generated UI", tone: "success" },
      ],
    },
    highlights: [
      { id: "wire-shortcuts", label: "Active build", tone: "accent" },
      { id: "cmd-3", label: "Result updates", tone: "info" },
    ],
  },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.cyan.500/0.14),transparent_28%),radial-gradient(circle_at_bottom_right,theme(colors.blue.500/0.14),transparent_30%)]" />

      <HeroProductDemo
        className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef4ff_44%,#f8fafc_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#061120_50%,#020617_100%)]"
        heading={{
          text: "Code with agents.",
          className:
            "max-w-4xl text-left font-outfit text-3xl font-semibold leading-none tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white",
        }}
        subheading={{
          text: "Watch the agent read, edit, and update the result in real time.",
          className:
            "mt-3 max-w-2xl text-left font-inter text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300",
        }}
        cta1={{
          label: "Start building",
          href: "#contact",
          variant: "default",
          size: "lg",
          className: [
            "px-7 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/20",
            "[--btn-bg:theme(colors.cyan.500)]",
            "hover:[--btn-hover-bg:theme(colors.cyan.400)]",
            "[--btn-fg:theme(colors.slate.950)]",
          ].join(" "),
        }}
        cta2={{
          label: "View features",
          href: "#features",
          variant: "outline",
          size: "lg",
          className: [
            "border px-7 py-3 text-sm font-semibold shadow-sm",
            "[--btn-bg:transparent]",
            "[--btn-fg:theme(colors.cyan.700)]",
            "[--btn-border:theme(colors.cyan.300)]",
            "hover:[--btn-hover-bg:theme(colors.cyan.50)]",
            "dark:[--btn-fg:theme(colors.cyan.300)]",
            "dark:[--btn-border:theme(colors.cyan.700)]",
          ].join(" "),
        }}
        stage={{
          scenarios,
          initialScenarioIndex: 0,
          className: "mt-2",
        }}
        section={{
          className: "px-6 py-12 sm:px-8 lg:px-10 lg:py-16",
        }}
        container={{
          className: "relative z-10 max-w-[88rem]",
        }}
        textContainer={{
          className: "max-w-3xl",
        }}
        demoContainer={{
          className: "relative min-h-[32rem] lg:min-h-[39rem]",
        }}
        buttonsContainer={{
          className: "mt-5 flex-col items-start sm:flex-row sm:items-center",
        }}
        demoBelowText
        ariaLabel="AI workflow automation hero section"
      />
    </div>
  );
}
