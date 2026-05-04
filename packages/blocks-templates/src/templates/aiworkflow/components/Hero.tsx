"use client";

import { HeroProductDemo } from "@nextworks/blocks-sections";
import type { HeroProductDemoProps } from "@nextworks/blocks-sections";

const scenarios: NonNullable<HeroProductDemoProps["stage"]>["scenarios"] = [
  {
    key: "intake-triage",
    label: "Intake & triage",
    description:
      "AI turns a revenue operations request into a routed workflow, then steps teams through context, execution, and approval in sequence.",

    activeWindow: "workflowStudio",
    workflowStudio: {
      window: {
        key: "workflowStudio",
        title: "Workflow Studio",
        subtitle: "Request intake",
        status: { label: "Drafting", tone: "info" },
        badge: "Scenario 01",
        layoutHint: {
          x: 0,
          y: 0,
          width: 62,
          height: 72,
          zIndex: 40,
          rotateDeg: -2,
        },
      },
      title: "1. Intake request → map the workflow",
      subtitle:
        "AI converts the request into a structured flow with the next handoff already prepared.",

      activeNodeId: "route-approval",
      activeRegionId: "handoffs",
      highlights: [
        { id: "route-approval", label: "Approval routing", tone: "accent" },
        { id: "crm-sync", label: "CRM sync", tone: "info" },
      ],
      nodes: [
        {
          id: "request-intake",
          label: "Parse request",
          description: "Extract goal, audience, budget, and timing from Slack.",
          type: "AI",
          status: "success",
          metadata: "Slack → structured brief",
        },
        {
          id: "policy-check",
          label: "Check playbooks",
          description: "Validate budget thresholds and required approvers.",
          type: "Guardrail",
          status: "success",
          metadata: "Policy set v3.2",
        },
        {
          id: "route-approval",
          label: "Route approval",
          description:
            "Send legal + finance review in parallel with due dates.",
          type: "Approval",
          status: "warning",
          active: true,
          emphasized: true,
          metadata: "2 approvers pending",
        },
        {
          id: "crm-sync",
          label: "Update CRM",
          description: "Create campaign and account tasks once approved.",
          type: "Action",
          status: "neutral",
          metadata: "HubSpot + Salesforce",
        },
      ],
      branches: [
        {
          id: "b1",
          fromNodeId: "request-intake",
          toNodeId: "policy-check",
          status: "success",
          active: true,
        },
        {
          id: "b2",
          fromNodeId: "policy-check",
          toNodeId: "route-approval",
          label: "Budget > $25k",
          status: "warning",
          active: true,
        },
        {
          id: "b3",
          fromNodeId: "route-approval",
          toNodeId: "crm-sync",
          label: "On approval",
          status: "neutral",
        },
      ],
      regions: [
        {
          id: "intake",
          label: "Intake",
          description: "AI request parsing and enrichment",
          status: "success",
          nodeIds: ["request-intake", "policy-check"],
        },
        {
          id: "handoffs",
          label: "Handoffs",
          description: "Approval routing and downstream actions",
          status: "warning",
          nodeIds: ["route-approval", "crm-sync"],
          active: true,
          highlighted: true,
        },
      ],
    },
    runConsole: {
      window: {
        key: "runConsole",
        title: "Live Run",
        subtitle: "Execution feed",
        status: { label: "Streaming", tone: "info" },
        badge: "24 events",
        layoutHint: {
          x: 50,
          y: 12,
          width: 44,
          height: 52,
          zIndex: 30,
          rotateDeg: 2,
        },
      },
      title: "2. Prepare execution in the live run",
      subtitle:
        "As the flow is mapped, downstream actions queue in order for launch.",

      statusLabel: "Queued behind approval",
      progressLabel: "Context gathered → awaiting sign-off",

      progressPercent: 64,
      activeEntryId: "log-3",
      entries: [
        {
          id: "log-1",
          message: "Parsed inbound request from #revops-priority",
          timestamp: "09:14",
          source: "Slack",
          status: "success",
        },
        {
          id: "log-2",
          message: "Matched campaign launch playbook and risk policy",
          timestamp: "09:14",
          source: "Policy Engine",
          status: "success",
        },
        {
          id: "log-3",
          message:
            "Queued approval tasks for finance and legal after policy match",

          timestamp: "09:15",
          source: "Approval Router",
          status: "warning",
          highlighted: true,
          detail: "Due in 2h • fallback escalation enabled",
        },
        {
          id: "log-4",
          message: "Prepared CRM updates and downstream notifications",
          timestamp: "09:15",
          source: "Workflow Engine",
          status: "info",
        },
      ],
      metrics: [
        { id: "m1", label: "Latency", value: "1.8s", tone: "success" },
        { id: "m2", label: "Systems", value: "6", tone: "info" },
        { id: "m3", label: "Fallbacks", value: "0", tone: "success" },
      ],
      highlights: [{ id: "log-3", label: "Approval handoff", tone: "warning" }],
    },
    approvalInbox: {
      window: {
        key: "approvalInbox",
        title: "Approval Inbox",
        subtitle: "Decisions",
        status: { label: "Needs review", tone: "warning" },
        badge: "2 pending",
        layoutHint: {
          x: 8,
          y: 56,
          width: 38,
          height: 38,
          zIndex: 20,
          rotateDeg: 1,
        },
      },
      title: "3. Route the exact approval request",
      subtitle:
        "Only the policy-required decision reaches a human, with the reasoning attached.",

      activeItemId: "approval-1",
      counts: [
        { id: "c1", label: "Pending", value: "2", tone: "warning" },
        { id: "c2", label: "Auto-approved", value: "14", tone: "success" },
        { id: "c3", label: "Escalated", value: "0", tone: "info" },
      ],
      items: [
        {
          id: "approval-1",
          title: "Budget increase for EMEA launch",
          description:
            "AI recommends +18% budget based on forecasted pipeline lift.",
          requester: "Growth workflow",
          status: "warning",
          priorityLabel: "High impact",
          dueLabel: "Due in 2h",
          highlighted: true,
          actions: [
            { id: "a1", label: "Approve", tone: "success" },
            { id: "a2", label: "Request change", tone: "warning" },
          ],
        },
        {
          id: "approval-2",
          title: "Legal review for new vendor terms",
          description:
            "Generated summary attached with highlighted clause changes.",
          requester: "Procurement workflow",
          status: "info",
          priorityLabel: "Standard",
          dueLabel: "Today",
        },
      ],
      highlights: [
        { id: "approval-1", label: "Priority approval", tone: "accent" },
      ],
    },
    knowledgePanel: {
      window: {
        key: "knowledgePanel",
        title: "Knowledge",
        subtitle: "Grounding",
        status: { label: "Synced", tone: "success" },
        badge: "12 sources",
        layoutHint: {
          x: 58,
          y: 56,
          width: 36,
          height: 36,
          zIndex: 10,
          rotateDeg: -1,
        },
      },
      title: "Source the context before anything runs",
      subtitle:
        "AI grounds the workflow in policy and prior outcomes before it creates the approval path.",

      query:
        "Which approvals are required for a regional budget expansion over $25k?",
      summary:
        "Finance and legal approval are required when forecasted spend exceeds threshold and vendor terms change.",
      sources: [
        { id: "s1", label: "Budget Policy", kind: "Policy", status: "success" },
        { id: "s2", label: "Vendor Terms", kind: "Contract", status: "info" },
        {
          id: "s3",
          label: "Campaign Playbook",
          kind: "Runbook",
          status: "success",
        },
      ],
      activeSnippetId: "snippet-1",
      snippets: [
        {
          id: "snippet-1",
          title: "Budget threshold rule",
          content:
            "Campaigns above $25k require finance approval. Add legal review when vendor commitments or contractual language change.",
          sourceId: "s1",
          confidence: "98% match",
          excerptLabel: "Recommended policy",
          tags: ["finance", "approval routing"],
          highlighted: true,
        },
        {
          id: "snippet-2",
          title: "Previous launch outcome",
          content:
            "Similar EMEA launch workflows reduced manual routing time by 72% while keeping audit logs intact.",
          sourceId: "s3",
          confidence: "Historical pattern",
          tags: ["benchmark", "ops efficiency"],
        },
      ],
      highlights: [
        { id: "snippet-1", label: "Policy citation", tone: "success" },
      ],
    },
    highlights: [
      { id: "route-approval", label: "Approval branch", tone: "accent" },
      { id: "approval-1", label: "Human checkpoint", tone: "warning" },
    ],
  },
  {
    key: "run-sync",
    label: "Live execution",
    description:
      "After approval, AI moves left to right through execution, status updates, and monitored completion.",

    activeWindow: "runConsole",
    workflowStudio: {
      window: {
        key: "workflowStudio",
        title: "Workflow Studio",
        subtitle: "Approved flow",
        status: { label: "Executing", tone: "success" },
        badge: "Scenario 02",
        layoutHint: {
          x: 0,
          y: 0,
          width: 62,
          height: 72,
          zIndex: 30,
          rotateDeg: -2,
        },
      },
      title: "1. Approval flips the workflow live",
      subtitle:
        "The mapped flow now advances straight into system updates and downstream handoffs.",

      activeNodeId: "notify-teams",
      nodes: [
        {
          id: "approval-complete",
          label: "Approvals cleared",
          description: "Finance and legal sign-off recorded.",
          type: "Checkpoint",
          status: "success",
          metadata: "2/2 approved",
        },
        {
          id: "update-crm",
          label: "Update CRM",
          description:
            "Sync campaign fields, account owners, and target lists.",
          type: "Action",
          status: "success",
          metadata: "HubSpot + Salesforce",
        },
        {
          id: "notify-teams",
          label: "Notify teams",
          description: "Post launch brief and tasks to GTM channels.",
          type: "Action",
          status: "info",
          active: true,
          emphasized: true,
          metadata: "Slack + Linear",
        },
        {
          id: "monitor-results",
          label: "Monitor rollout",
          description: "Track errors, latency, and downstream completion.",
          type: "Observe",
          status: "neutral",
          metadata: "Audit + telemetry",
        },
      ],
      branches: [
        {
          id: "rb1",
          fromNodeId: "approval-complete",
          toNodeId: "update-crm",
          status: "success",
          active: true,
        },
        {
          id: "rb2",
          fromNodeId: "update-crm",
          toNodeId: "notify-teams",
          status: "info",
          active: true,
        },
        {
          id: "rb3",
          fromNodeId: "notify-teams",
          toNodeId: "monitor-results",
          status: "neutral",
        },
      ],
      regions: [
        {
          id: "execution",
          label: "Execution lane",
          description: "System updates and notifications",
          status: "info",
          nodeIds: ["update-crm", "notify-teams", "monitor-results"],
          active: true,
          highlighted: true,
        },
      ],
    },
    runConsole: {
      window: {
        key: "runConsole",
        title: "Live Run",
        subtitle: "Execution feed",
        status: { label: "Healthy", tone: "success" },
        badge: "42 events",
        layoutHint: {
          x: 50,
          y: 10,
          width: 44,
          height: 54,
          zIndex: 40,
          rotateDeg: 2,
        },
      },
      title: "2. Watch every action execute in order",
      subtitle:
        "Teams can follow the exact sequence without opening a single background job dashboard.",

      statusLabel: "Running smoothly",
      progressLabel: "5 of 6 steps complete",
      progressPercent: 86,
      activeEntryId: "exec-4",
      entries: [
        {
          id: "exec-1",
          message: "Recorded finance and legal approval payloads",
          timestamp: "09:18",
          source: "Approval Router",
          status: "success",
        },
        {
          id: "exec-2",
          message: "Updated 38 CRM records and created launch tasks",
          timestamp: "09:18",
          source: "CRM Sync",
          status: "success",
          detail: "0 conflicts detected",
        },
        {
          id: "exec-3",
          message:
            "Published launch brief to #gtm-launch and created Linear checklist",
          timestamp: "09:19",
          source: "Notifier",
          status: "info",
        },
        {
          id: "exec-4",
          message: "Monitoring downstream task completion and SLA risk",
          timestamp: "09:19",
          source: "Observer",
          status: "success",
          highlighted: true,
          detail: "Auto-escalation armed if blockers appear",
        },
      ],
      metrics: [
        { id: "rm1", label: "Tasks created", value: "18", tone: "success" },
        { id: "rm2", label: "Records updated", value: "38", tone: "info" },
        { id: "rm3", label: "Errors", value: "0", tone: "success" },
      ],
      highlights: [{ id: "exec-4", label: "Live monitoring", tone: "success" }],
    },
    approvalInbox: {
      window: {
        key: "approvalInbox",
        title: "Approval Inbox",
        subtitle: "Audit trail",
        status: { label: "Clear", tone: "success" },
        badge: "0 pending",
        layoutHint: {
          x: 10,
          y: 58,
          width: 36,
          height: 34,
          zIndex: 20,
          rotateDeg: 1,
        },
      },
      title: "3. Keep the approval trail visible",
      subtitle:
        "Once the decision is made, the inbox becomes the audit layer instead of the bottleneck.",

      counts: [
        { id: "rc1", label: "Pending", value: "0", tone: "success" },
        { id: "rc2", label: "Completed", value: "8", tone: "info" },
        { id: "rc3", label: "Auto-approved", value: "22", tone: "success" },
      ],
      items: [
        {
          id: "approval-done-1",
          title: "Finance approval recorded",
          description:
            "Budget threshold exception approved with full audit log.",
          requester: "Growth workflow",
          status: "success",
          priorityLabel: "Complete",
          dueLabel: "09:17",
        },
        {
          id: "approval-done-2",
          title: "Legal review completed",
          description:
            "Clause changes accepted and attached to workflow record.",
          requester: "Procurement workflow",
          status: "success",
          priorityLabel: "Complete",
          dueLabel: "09:18",
        },
      ],
    },
    knowledgePanel: {
      window: {
        key: "knowledgePanel",
        title: "Knowledge",
        subtitle: "Operational context",
        status: { label: "Fresh", tone: "success" },
        badge: "8 live docs",
        layoutHint: {
          x: 58,
          y: 56,
          width: 34,
          height: 34,
          zIndex: 10,
          rotateDeg: -1,
        },
      },
      title: "Context stays attached to execution",
      subtitle:
        "Every downstream change still points back to the operating rule that triggered it.",

      query: "What should happen after launch approval is complete?",
      summary:
        "Sync CRM, notify GTM owners, create follow-up tasks, and monitor SLA risks until completion.",
      sources: [
        {
          id: "rs1",
          label: "Launch Runbook",
          kind: "Runbook",
          status: "success",
        },
        { id: "rs2", label: "Team SLA Policy", kind: "Policy", status: "info" },
      ],
      activeSnippetId: "runbook-snippet",
      snippets: [
        {
          id: "runbook-snippet",
          title: "Post-approval sequence",
          content:
            "After approvals clear, update CRM state, notify GTM channels, open implementation tasks, and start SLA monitoring for any dependencies.",
          sourceId: "rs1",
          confidence: "Runbook step 4",
          excerptLabel: "Execution guidance",
          tags: ["execution", "handoff"],
          highlighted: true,
        },
      ],
    },
    highlights: [
      { id: "notify-teams", label: "Live handoff", tone: "accent" },
      { id: "exec-4", label: "Observed completion", tone: "success" },
    ],
  },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.cyan.500/0.18),transparent_32%),radial-gradient(circle_at_bottom_right,theme(colors.violet.500/0.14),transparent_34%)]" />

      <HeroProductDemo
        className="bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(239,246,255,0.92)_46%,rgba(248,250,252,0.98)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(8,47,73,0.96)_42%,rgba(15,23,42,0.98)_100%)]"
        heading={{
          text: "Let AI move work from request to action in one visible flow.",

          className:
            "max-w-3xl text-left font-outfit text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white",
        }}
        subheading={{
          text: "Turn incoming requests into workflows that gather context, queue the next step, route the right approval, and then execute left to right with live status.",

          className:
            "mt-6 max-w-2xl text-left font-inter text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300",
        }}
        cta1={{
          label: "Start automating",
          href: "#contact",
          variant: "default",
          size: "lg",
          className: [
            "px-8 py-3 text-base font-semibold shadow-lg shadow-cyan-500/20",
            "[--btn-bg:theme(colors.cyan.500)]",
            "hover:[--btn-hover-bg:theme(colors.cyan.400)]",
            "[--btn-fg:theme(colors.slate.950)]",
            "hover:[--btn-hover-fg:theme(colors.slate.950)]",
          ].join(" "),
        }}
        cta2={{
          label: "See how it works",
          href: "#features",
          variant: "outline",
          size: "lg",
          className: [
            "border px-8 py-3 text-base font-semibold shadow-sm",
            "[--btn-bg:transparent]",
            "[--btn-fg:theme(colors.cyan.700)]",
            "[--btn-border:theme(colors.cyan.300)]",
            "hover:[--btn-hover-bg:theme(colors.cyan.50)]",
            "hover:[--btn-hover-fg:theme(colors.cyan.800)]",
            "dark:[--btn-fg:theme(colors.cyan.300)]",
            "dark:[--btn-border:theme(colors.cyan.700)]",
            "dark:hover:[--btn-hover-bg:theme(colors.cyan.950)]",
            "dark:hover:[--btn-hover-fg:theme(colors.cyan.200)]",
          ].join(" "),
        }}
        stage={{
          scenarios,
          initialScenarioIndex: 0,
          autoCycle: true,
          cycleIntervalMs: 5200,
          className:
            "[--demo-stage-bg:linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(224,242,254,0.72)_100%)] dark:[--demo-stage-bg:linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(12,74,110,0.70)_100%)]",
        }}
        section={{
          className: "px-6 py-16 sm:px-8 lg:px-10 lg:py-24",
        }}
        container={{
          className: "relative z-10 gap-8 lg:gap-10",
        }}
        textContainer={{
          className: "pt-2 lg:pt-4",
        }}
        demoContainer={{
          className: "relative min-h-[36rem] w-full lg:min-h-[42rem]",
        }}
        buttonsContainer={{
          className: "mt-8 flex-col items-start sm:flex-row sm:items-center",
        }}
        ariaLabel="AI workflow automation hero section"
      />
    </div>
  );
}
