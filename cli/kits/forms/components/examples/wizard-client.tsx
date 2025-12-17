"use client";

import React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardClientSchema } from "@/lib/validation/wizard";
import type { WizardClientValues } from "@/lib/validation/wizard";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";
import { toast } from "sonner";

export default function WizardClient() {
  const [step, setStep] = React.useState(0);
  const methods = useForm<WizardClientValues>({
    resolver: zodResolver(
      wizardClientSchema,
    ) as unknown as Resolver<WizardClientValues>,
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      visibility: "public",
      tags: "",
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, trigger, reset } = methods;

  const canNext = async () => {
    // Validate only current step fields
    if (step === 0) {
      const ok = await trigger(["title", "slug"]);
      return ok;
    }
    if (step === 1) {
      const ok = await trigger(["content", "excerpt"]);
      return ok;
    }
    if (step === 2) {
      const ok = await trigger(["visibility", "tags"]);
      return ok;
    }
    return true;
  };

  const next = async () => {
    const ok = await canNext();
    if (!ok) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: WizardClientValues) => {
    try {
      const res = await fetch("/api/wizard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload ? mapApiErrorsToForm(methods, payload) : undefined;
        toast.error(msg || payload?.message || "Submit failed");
        return;
      }
      toast.success("Wizard submit succeeded");
      reset();
      setStep(0);
    } catch (e) {
      console.error(e);
      toast.error("Submit failed");
    }
  };

  return (
    <div className="bg-card rounded-md p-6">
      <Form methods={methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`rounded px-3 py-1 ${step === 0 ? "bg-primary text-white" : "bg-muted-foreground text-muted-foreground text-sm"}`}
            >
              Step 1
            </div>
            <div
              className={`rounded px-3 py-1 ${step === 1 ? "bg-primary text-white" : "bg-muted-foreground text-muted-foreground text-sm"}`}
            >
              Step 2
            </div>
            <div
              className={`rounded px-3 py-1 ${step === 2 ? "bg-primary text-white" : "bg-muted-foreground text-muted-foreground text-sm"}`}
            >
              Step 3
            </div>
          </div>

          {step === 0 && (
            <>
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <>
              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="form-select w-full rounded border p-2"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex items-center gap-3">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={back}>
                Back
              </Button>
            ) : null}

            {step < 2 ? (
              <Button type="button" onClick={next}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
