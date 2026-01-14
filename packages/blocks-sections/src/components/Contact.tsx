"use client";

import React from "react";
import { cn } from "@nextworks/blocks-core";
import { Button, Input, Textarea, Label } from "@nextworks/blocks-core";

// Supported field types
type FieldType = "text" | "email" | "tel" | "textarea";

/**
 * Configuration for a single form field in the Contact section.
 * @public
 */
export interface ContactField {
  /** Unique id/name for the field. Used for htmlFor and form submission. */
  id: string;
  /** Visible label text for the field */
  label: string;
  /** Placeholder text rendered inside the input */
  placeholder?: string;
  /** Whether the field is required for form submission */
  required?: boolean;
  /** Type of field to render (text, email, tel, textarea). */
  type?: FieldType;
}

/**
 * Props for the Contact section component.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides (section, container,
 *   headerWrapper, headerText, subheaderText, form, fieldsWrapper, field,
 *   label, input, textarea, submitButtonWrapper, submitButtonStyle). Consumer
 *   classes are merged after defaults via cn().
 * - Behavior: onSubmit is called with the form event after default
 *   prevention. Provide your own handler to integrate with APIs.
 * - Motion: controlled by enableMotion; when false, removes button hover lift.
 * - Accessibility: rendered as a semantic <section> with aria-label.
 */
export interface ContactProps {
  /** Array of fields to render in the form. @defaultValue defaultFormData */
  fields?: ContactField[];
  /** Heading text above the form. @defaultValue "Ready to Grow Your Business?" */
  contactHeaderText?: string;
  /** Subheading under the header. @defaultValue "Schedule a free consultation with our experts." */
  contactSubHeaderText?: string;

  /** Optional id to attach to the root section element. @defaultValue "contact" */
  id?: string;
  /** Optional top-level class to override the section root */
  className?: string;

  /** Styling configuration objects (slots) */
  section?: { className?: string };
  container?: { className?: string };
  headerWrapper?: { className?: string };
  headerText?: { className?: string };
  subheaderText?: { className?: string };
  form?: { className?: string };
  fieldsWrapper?: { className?: string };
  field?: { className?: string };
  label?: { className?: string };
  input?: { className?: string };
  textarea?: { className?: string };
  submitButtonWrapper?: { className?: string };
  submitButtonStyle?: {
    unstyled?: boolean;
    style?: React.CSSProperties;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
  };

  /** Text for the submit button. @defaultValue "Schedule Free Consultation" */
  submitButtonText?: string;
  /** Callback fired on submit; default prevented. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** ARIA label for the section. @defaultValue "Contact section" */
  ariaLabel?: string;

  /** When false, removes hover lift/transition on the submit button */
  enableMotion?: boolean;
}

const defaultFormData: ContactField[] = [
  {
    id: "name",
    label: "Your Full Name",
    placeholder: "John Doe",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    required: true,
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: false,
    type: "tel",
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Enter your company name",
    required: false,
    type: "text",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Tell us about your project...",
    required: true,
    type: "textarea",
  },
];

/**
 * Contact section with a configurable form and submit action.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged via cn().
 * - Behavior: onSubmit is invoked with the form event after calling
 *   preventDefault().
 * - Motion: enableMotion toggles the button hover lift/transition.
 * - Accessibility: Uses a semantic <section> with aria-label.
 *
 * @example
 * <Contact onSubmit={(e) => { // send to your API }} />
 */
export function Contact({
  fields = defaultFormData,
  contactHeaderText = "Ready to Grow Your Business?",
  contactSubHeaderText = "Schedule a free consultation with our experts.",
  id = "contact",
  className,
  section = { className: "py-16 px-4 bg-primary" },
  container = { className: "mx-auto max-w-4xl" },
  headerWrapper = { className: "mb-8 text-center" },
  headerText = {
    className: "text-2xl font-bold font-poppins text-primary-foreground",
  },
  subheaderText = {
    className: "mt-2 text-lg font-inter text-primary-foreground px-4 md:px-14",
  },
  form = {
    className:
      "bg-card p-8 rounded-lg shadow-md border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
  },
  fieldsWrapper = { className: "space-y-4" },
  field = { className: "space-y-2" },
  label = {
    className:
      "text-card-foreground text-sm font-medium font-poppins block text-[var(--label-fg)]",
  },
  input = {
    className:
      "w-full p-3 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-inter border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
  },
  textarea = {
    className:
      "w-full p-3 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical min-h-[120px] font-inter border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
  },
  submitButtonWrapper = { className: "pt-2" },
  submitButtonStyle = {
    variant: "default",
    size: "lg",
    className:
      "w-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  submitButtonText = "Schedule Free Consultation",
  onSubmit,
  ariaLabel = "Contact section",
  enableMotion = true,
}: ContactProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <section
      id={id}
      className={cn("w-full", section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(container.className)}>
        <div className={cn(headerWrapper.className)}>
          {contactHeaderText && (
            <h2 className={cn(headerText.className)}>{contactHeaderText}</h2>
          )}
          {contactSubHeaderText && (
            <p className={cn(subheaderText.className)}>
              {contactSubHeaderText}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className={cn(form.className)}>
          <div className={cn(fieldsWrapper.className)}>
            {fields.map((f) => {
              const isTextarea = f.type === "textarea";
              return (
                <div key={f.id} className={cn(field.className)}>
                  <Label htmlFor={f.id} className={cn(label.className)}>
                    {f.label}
                    {f.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  {isTextarea ? (
                    <Textarea
                      id={f.id}
                      name={f.id}
                      placeholder={f.placeholder}
                      required={f.required}
                      rows={4}
                      className={cn(textarea.className)}
                    />
                  ) : (
                    <Input
                      type={f.type ?? "text"}
                      id={f.id}
                      name={f.id}
                      placeholder={f.placeholder}
                      required={f.required}
                      className={cn(input.className)}
                    />
                  )}
                </div>
              );
            })}
            <div className={cn(submitButtonWrapper.className)}>
              <Button
                type="submit"
                unstyled={submitButtonStyle.unstyled}
                variant={submitButtonStyle.variant}
                size={submitButtonStyle.size}
                className={cn(
                  submitButtonStyle.className,
                  !enableMotion &&
                    "transition-none hover:!translate-y-0 hover:shadow-none",
                )}
                style={submitButtonStyle.style}
              >
                {submitButtonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
