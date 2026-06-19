"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface CommandShowcaseCta {
  label?: string;
  href?: string;
  ariaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  unstyled?: boolean;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export interface CommandShowcaseLine {
  text: React.ReactNode;
  className?: string;
}

export interface CommandShowcaseCommandLine extends CommandShowcaseLine {
  command?: string;
}

export interface CommandShowcaseNote {
  title?: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

export interface CommandShowcaseClassNames {
  section?: string;
  backgroundGlow?: string;
  container?: string;
  header?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  contentGrid?: string;
  terminalOuter?: string;
  terminalCard?: string;
  terminalChrome?: string;
  terminalChromeDot?: string;
  terminalTitle?: string;
  copyButton?: string;
  commandList?: string;
  commandLine?: string;
  prompt?: string;
  commandText?: string;
  outputList?: string;
  outputLine?: string;
  notes?: string;
  note?: string;
  noteMarker?: string;
  noteTitle?: string;
  noteDescription?: string;
  buttons?: string;
  cta?: string;
}

export interface CommandShowcaseProps {
  id?: string;
  className?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  commands?: Array<string | CommandShowcaseCommandLine>;
  output?: Array<string | CommandShowcaseLine> | false;
  notes?: Array<string | CommandShowcaseNote> | false;
  bullets?: Array<string | CommandShowcaseNote> | false;
  cta?: CommandShowcaseCta;
  showCopyButton?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  copyValue?: string;
  terminalLabel?: string;
  terminalTitle?: React.ReactNode;
  ariaLabel?: string;
  titleId?: string;
  enableMotion?: boolean;
  classNames?: CommandShowcaseClassNames;
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  terminal?: { className?: string };
  notesSlot?: { className?: string };
}

const defaultCommands = [
  "npx create-next-app@latest",
  "cd my-app",
  "npx nextworks@latest add blocks --templates",
  "npm run dev",
];

const defaultOutput = [
  "✓ Detected Next.js app",
  "✓ Installing Blocks kit",
  "✓ Added core UI primitives",
  "✓ Added sections and templates",
  "✓ Patched App Router layout",
];

const defaultNotes: CommandShowcaseNote[] = [
  {
    title: "Copy-in workflow",
    description: "Files are added to your project so you can edit them locally.",
  },
  {
    title: "Router-aware setup",
    description: "The CLI handles App Router and Pages Router project shapes.",
  },
  {
    title: "Dry-run friendly",
    description: "Preview install changes before writing files when you need to check paths.",
  },
];

function normalizeCommandLine(
  line: string | CommandShowcaseCommandLine,
): CommandShowcaseCommandLine {
  return typeof line === "string" ? { text: line, command: line } : line;
}

function normalizeLine(line: string | CommandShowcaseLine): CommandShowcaseLine {
  return typeof line === "string" ? { text: line } : line;
}

function normalizeNote(note: string | CommandShowcaseNote): CommandShowcaseNote {
  return typeof note === "string" ? { description: note } : note;
}

function getLineText(line: string | CommandShowcaseCommandLine) {
  if (typeof line === "string") {
    return line;
  }

  if (line.command) {
    return line.command;
  }

  return typeof line.text === "string" ? line.text : "";
}

function renderCta(cta: CommandShowcaseCta | undefined) {
  if (!cta?.label) {
    return null;
  }

  return (
    <Button
      asChild
      variant={cta.variant}
      size={cta.size}
      className={cta.className}
      unstyled={cta.unstyled}
      style={cta.style}
    >
      <Link
        href={cta.href || "#"}
        aria-label={cta.ariaLabel ?? cta.label}
        target={cta.target}
        rel={cta.rel ?? (cta.target === "_blank" ? "noreferrer" : undefined)}
      >
        {cta.label}
      </Link>
    </Button>
  );
}

export function CommandShowcase({
  id,
  className,
  eyebrow = "CLI workflow",
  title = "Install a landing page kit from your terminal.",
  description =
    "Show the setup flow clearly with commands, install output, and a few implementation notes.",
  commands = defaultCommands,
  output = defaultOutput,
  notes,
  bullets,
  cta,
  showCopyButton = false,
  copyLabel = "Copy commands",
  copiedLabel = "Copied",
  copyValue,
  terminalLabel = "Terminal preview showing setup commands and output",
  terminalTitle = "setup.sh",
  ariaLabel = "Command showcase section",
  titleId,
  enableMotion = true,
  classNames,
  section,
  container,
  header,
  terminal,
  notesSlot,
}: CommandShowcaseProps) {
  const [copyStatus, setCopyStatus] = React.useState<"idle" | "copied">("idle");

  const normalizedCommands = commands.map(normalizeCommandLine);
  const normalizedOutput = output === false ? [] : output.map(normalizeLine);
  const resolvedNotes = notes ?? bullets ?? defaultNotes;
  const normalizedNotes =
    resolvedNotes === false ? [] : resolvedNotes.map(normalizeNote);

  const resolvedCopyValue =
    copyValue ?? commands.map(getLineText).filter(Boolean).join("\n");

  const motionClasses = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  const handleCopy = async () => {
    if (!resolvedCopyValue || typeof navigator === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(resolvedCopyValue);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    } catch {
      setCopyStatus("idle");
    }
  };

  const resolvedCta: CommandShowcaseCta | undefined = cta?.label
    ? {
        href: "#",
        variant: "outline",
        size: "lg",
        unstyled: true,
        ...cta,
        className: cn(
          "h-11 rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-medium text-white/86 hover:border-white/28 hover:bg-white/[0.07]",
          motionClasses,
          classNames?.cta,
          cta.className,
        ),
      }
    : undefined;

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-[#030303] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24",
        section?.className,
        classNames?.section,
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-28 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.11),rgba(255,255,255,0.04)_38%,transparent_72%)] blur-3xl",
          classNames?.backgroundGlow,
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 mx-auto max-w-7xl",
          container?.className,
          classNames?.container,
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-3xl text-center",
            header?.className,
            classNames?.header,
          )}
        >
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-medium uppercase tracking-[0.28em] text-white/48",
                classNames?.eyebrow,
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h2
            id={titleId}
            className={cn(
              "mt-5 text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl",
              classNames?.title,
            )}
          >
            {title}
          </h2>

          {description ? (
            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/60 sm:text-lg",
                classNames?.description,
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-stretch",
            classNames?.contentGrid,
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[0_24px_90px_rgba(0,0,0,0.62)] backdrop-blur",
              enableMotion && "transition-transform duration-300 hover:-translate-y-1",
              !enableMotion && "transition-none hover:!translate-y-0",
              terminal?.className,
              classNames?.terminalOuter,
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#050505]",
                classNames?.terminalCard,
              )}
              role="region"
              aria-label={terminalLabel}
            >
              <div
                className={cn(
                  "flex h-11 items-center gap-2 border-b border-white/10 px-4",
                  classNames?.terminalChrome,
                )}
              >
                <span
                  className={cn("size-2.5 rounded-full bg-white/24", classNames?.terminalChromeDot)}
                  aria-hidden="true"
                />
                <span
                  className={cn("size-2.5 rounded-full bg-white/16", classNames?.terminalChromeDot)}
                  aria-hidden="true"
                />
                <span
                  className={cn("size-2.5 rounded-full bg-white/10", classNames?.terminalChromeDot)}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "ml-3 min-w-0 flex-1 truncate font-mono text-xs text-white/34",
                    classNames?.terminalTitle,
                  )}
                >
                  {terminalTitle}
                </span>
                {showCopyButton ? (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(
                      "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-sans text-xs font-medium text-white/58 transition-colors hover:border-white/22 hover:bg-white/[0.08] hover:text-white/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      classNames?.copyButton,
                    )}
                    aria-label={copyStatus === "copied" ? copiedLabel : copyLabel}
                  >
                    {copyStatus === "copied" ? copiedLabel : copyLabel}
                  </button>
                ) : null}
              </div>

              <div className="p-5 font-mono text-sm sm:p-6">
                <div className={cn("space-y-3", classNames?.commandList)}>
                  {normalizedCommands.map((line, index) => (
                    <p
                      key={`${getLineText(commands[index])}-${index}`}
                      className={cn(
                        "flex gap-3 break-all leading-6 text-white/78",
                        classNames?.commandLine,
                        line.className,
                      )}
                    >
                      <span
                        className={cn("shrink-0 text-white/28", classNames?.prompt)}
                        aria-hidden="true"
                      >
                        $
                      </span>
                      <span className={classNames?.commandText}>{line.text}</span>
                    </p>
                  ))}
                </div>

                {normalizedOutput.length > 0 ? (
                  <div
                    className={cn(
                      "mt-7 space-y-2 border-t border-white/10 pt-5",
                      classNames?.outputList,
                    )}
                    aria-label="Command output"
                  >
                    {normalizedOutput.map((line, index) => (
                      <p
                        key={`${String(line.text)}-${index}`}
                        className={cn(
                          "break-all leading-6 text-white/42",
                          classNames?.outputLine,
                          line.className,
                        )}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {normalizedNotes.length > 0 || resolvedCta ? (
            <div
              className={cn(
                "flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur sm:p-8",
                notesSlot?.className,
                classNames?.notes,
              )}
            >
              {normalizedNotes.length > 0 ? (
                <ul className="space-y-5">
                  {normalizedNotes.map((note, index) => (
                    <li
                      key={`${String(note.title ?? note.description)}-${index}`}
                      className={cn("flex gap-4", classNames?.note, note.className)}
                    >
                      <span
                        className={cn(
                          "mt-2 size-1.5 shrink-0 rounded-full bg-white/50",
                          classNames?.noteMarker,
                        )}
                        aria-hidden="true"
                      />
                      <span>
                        {note.title ? (
                          <span
                            className={cn(
                              "block text-sm font-medium text-white/84",
                              classNames?.noteTitle,
                            )}
                          >
                            {note.title}
                          </span>
                        ) : null}
                        <span
                          className={cn(
                            "mt-1 block text-sm leading-6 text-white/52",
                            classNames?.noteDescription,
                          )}
                        >
                          {note.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {resolvedCta ? (
                <div className={cn("mt-8 flex", classNames?.buttons)}>
                  {renderCta(resolvedCta)}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
