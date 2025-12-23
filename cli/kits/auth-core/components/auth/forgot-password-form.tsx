"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validation/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success(
          "If an account exists, a reset link was sent (check server console in dev).",
        );
      } else {
        toast.error("Failed to request password reset");
      }
    } catch {
      toast.error("Failed to request password reset");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md pt-6">
      <h2 className="text-foreground text-center text-2xl font-bold">
        Forgot password
      </h2>
      <p className="text-muted-foreground mt-1 text-center text-sm">
        Enter your email and we will send a reset link.
      </p>

      <Form methods={methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm"
        >
          <FormField
            control={control}
            name="email"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Request reset
          </Button>
        </form>
      </Form>
    </div>
  );
}
