"use client";

import React from "react";
import { cn } from "@nextworks/blocks-core";

/**
 * Interface for individual process steps.
 * @public
 */
export interface ProcessStep {
  /** Ordinal step number starting at 1 */
  stepNumber: number;
  /** Short title for the step */
  title: string;
  /** Description of what happens in this step */
  description: string;
  /** Optional icon or emoji to visually represent the step */
  icon?: string;
}

/**
 * Props for configuring the ProcessTimeline component (slot-style + cn).
 *
 * @remarks
 * - Styling: exposes slot-style className overrides; consumer classes merge
 *   after defaults via cn().
 * - Layout: renders a horizontal timeline on desktop and vertical on mobile.
 * - Accessibility: semantic <section> with aria-label.
 */
export interface ProcessTimelineProps {
  /** Optional id on root */
  id?: string;
  /** Root className merged into section slot */
  className?: string;

  /** Array of steps to render. @defaultValue a 4-step discovery-to-launch flow */
  steps?: ProcessStep[];
  /** Section heading text. @defaultValue "Our Process" */
  heading?: string;
  /** Optional subheading text */
  subheading?: string;

  /** Styling configuration objects */
  section?: {
    className?: string;
  };
  container?: {
    className?: string;
  };
  header?: {
    className?: string;
  };
  headingStyle?: {
    className?: string;
  };
  subheadingStyle?: {
    className?: string;
  };
  timelineContainer?: {
    className?: string;
  };
  desktopTimeline?: {
    className?: string;
  };
  connectingLine?: {
    className?: string;
  };
  stepContainer?: {
    className?: string;
  };
  stepCircle?: {
    className?: string;
  };
  stepNumber?: {
    className?: string;
  };
  stepIcon?: {
    className?: string;
  };
  stepContent?: {
    className?: string;
  };
  stepTitle?: {
    className?: string;
  };
  stepDescription?: {
    className?: string;
  };
  mobileTimeline?: {
    className?: string;
  };
  mobileStep?: {
    className?: string;
  };
  mobileVerticalLine?: {
    className?: string;
  };
  mobileStepCircle?: {
    className?: string;
  };
  mobileStepContent?: {
    className?: string;
  };
  mobileStepIcon?: {
    className?: string;
  };
  mobileStepTitle?: {
    className?: string;
  };
  mobileStepDescription?: {
    className?: string;
  };

  /** ARIA label for the process timeline section */
  ariaLabel?: string;
}

/**
 * Responsive timeline showing a multi-step process for your workflow.
 *
 * @remarks
 * - Renders horizontally on desktop and vertically on mobile.
 * - Slot-style className overrides are merged after defaults via cn().
 * - Uses a semantic <section> and supports aria-label.
 *
 * @example
 * <ProcessTimeline steps={[{ stepNumber: 1, title: 'Plan', description: '...' }]} />
 */
export function ProcessTimeline({
  id,
  className,
  steps = [
    {
      stepNumber: 1,
      title: "Discovery Call",
      description: "Understanding your goals and requirements",
      icon: "🔍",
    },
    {
      stepNumber: 2,
      title: "Strategy & Design",
      description: "Custom mockups and project roadmap",
      icon: "🎨",
    },
    {
      stepNumber: 3,
      title: "Development",
      description: "Building your site with regular updates",
      icon: "⚡",
    },
    {
      stepNumber: 4,
      title: "Launch & Support",
      description: "Going live with ongoing maintenance",
      icon: "🚀",
    },
  ],
  heading = "Our Process",
  subheading,
  section = {
    className: "py-16 md:py-20 bg-muted",
  },
  container = {
    className: "max-w-6xl mx-auto px-5 md:px-10",
  },
  header = {
    className: "space-y-4 mb-12 md:mb-16 text-center",
  },
  headingStyle = {
    className:
      "text-4xl md:text-5xl font-bold font-poppins text-foreground leading-tight",
  },
  subheadingStyle = {
    className:
      "text-lg md:text-xl font-inter text-muted-foreground max-w-2xl mx-auto leading-relaxed",
  },
  timelineContainer = {
    className: "w-full max-w-4xl mx-auto",
  },
  desktopTimeline = {
    className: "hidden lg:flex justify-between items-start relative w-full",
  },
  connectingLine = {
    className:
      "absolute top-8 left-15 right-15 h-0.5 z-10 bg-[var(--process-connector)] dark:bg-[var(--process-connector)]",
  },
  stepContainer = {
    className:
      "flex flex-col items-center space-y-4 flex-1 max-w-48 relative z-20",
  },
  stepCircle = {
    className:
      "w-15 h-15 font-bold text-2xl rounded-full flex items-center justify-center shadow-lg relative z-30 bg-[var(--process-step-bg)] text-[var(--process-step-fg)] dark:bg-[var(--process-step-bg)] dark:text-[var(--process-step-fg)]",
  },
  stepNumber = {
    className:
      "font-bold text-2xl text-[var(--process-step-fg)] dark:text-[var(--process-step-fg)]",
  },
  stepIcon = {
    className: "text-2xl md:text-3xl mb-2",
  },
  stepContent = {
    className: "space-y-2 text-center",
  },
  stepTitle = {
    className:
      "text-lg md:text-xl font-semibold font-poppins text-foreground leading-tight",
  },
  stepDescription = {
    className:
      "text-sm md:text-base font-inter leading-relaxed text-[var(--description-fg)]",
  },
  mobileTimeline = {
    className: "flex lg:hidden flex-col space-y-8 w-full",
  },
  mobileStep = {
    className: "flex items-start relative",
  },
  mobileVerticalLine = {
    className:
      "absolute left-7 top-15 bottom-[-2rem] w-0.5 z-10 bg-[var(--process-connector)] dark:bg-[var(--process-connector)]",
  },
  mobileStepCircle = {
    className:
      "w-15 h-15 font-bold text-2xl rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mr-6 z-20 bg-[var(--process-step-bg)] text-[var(--process-step-fg)] dark:bg-[var(--process-step-bg)] dark:text-[var(--process-step-fg)]",
  },
  mobileStepContent = {
    className: "flex flex-col items-start space-y-3 flex-1 pt-2",
  },
  mobileStepIcon = {
    className: "text-2xl md:text-3xl",
  },
  mobileStepTitle = {
    className:
      "text-lg md:text-xl font-semibold font-poppins text-foreground leading-tight",
  },
  mobileStepDescription = {
    className:
      "text-sm md:text-base font-inter leading-relaxed text-[var(--description-fg)]",
  },
  ariaLabel = "Process timeline section",
}: ProcessTimelineProps) {
  return (
    <section
      id={id}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {/* Section Header */}
        <div className={header.className}>
          <h2 className={headingStyle.className}>{heading}</h2>
          {subheading && (
            <p className={subheadingStyle.className}>{subheading}</p>
          )}
        </div>

        {/* Timeline Steps */}
        <div className={timelineContainer.className}>
          {/* Desktop: Horizontal Layout */}
          <div className={desktopTimeline.className}>
            {/* Connecting Line */}
            <div className={connectingLine.className} />

            {steps.map((step) => (
              <div key={step.stepNumber} className={stepContainer.className}>
                {/* Step Circle with Number */}
                <div className={stepCircle.className}>
                  <span className={stepNumber.className}>
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Icon */}
                {step.icon && (
                  <div className={stepIcon.className}>{step.icon}</div>
                )}

                {/* Step Content */}
                <div className={stepContent.className}>
                  <h3 className={stepTitle.className}>{step.title}</h3>
                  <p className={stepDescription.className}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Layout */}
          <div className={mobileTimeline.className}>
            {steps.map((step, index) => (
              <div key={step.stepNumber} className={mobileStep.className}>
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className={mobileVerticalLine.className} />
                )}

                {/* Step Circle */}
                <div className={mobileStepCircle.className}>
                  <span className={stepNumber.className}>
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Content */}
                <div className={mobileStepContent.className}>
                  {/* Step Icon */}
                  {step.icon && (
                    <div className={mobileStepIcon.className}>{step.icon}</div>
                  )}

                  <h3 className={mobileStepTitle.className}>{step.title}</h3>
                  <p className={mobileStepDescription.className}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
