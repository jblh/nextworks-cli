import { z } from "zod";

export const step1Schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional().or(z.literal("")),
});

export const step2Schema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().optional().or(z.literal("")),
});

export const step3Schema = z.object({
  visibility: z.enum(["public", "private"]).default("public"),
  tags: z.string().optional().or(z.literal("")),
});

export const wizardClientSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);
export type WizardClientValues = z.infer<typeof wizardClientSchema>;

// Server-side minimal schema for creating the Post (what we actually persist)
export const wizardServerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional().or(z.literal("")),
  visibility: z.enum(["public", "private"]).default("public"),
  tags: z.string().optional().or(z.literal("")),
});
export type WizardServerValues = z.infer<typeof wizardServerSchema>;
