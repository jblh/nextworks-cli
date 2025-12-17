"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validation/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function ResetPasswordPage() {
  // Do not gate rendering on process.env here — rendering must be consistent
  // between server and client to avoid hydration mismatches. The API routes
  // already enforce the feature guard (returning 404) so we let the client
  // always render and surface the API's response.
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [valid, setValid] = useState<boolean | null>(null);

  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema) as any,
    defaultValues: { token, password: "", confirmPassword: "" },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    (async () => {
      if (!token) return setValid(false);
      try {
        const res = await fetch(
          `/api/auth/reset-password?token=${encodeURIComponent(token)}`,
        );
        if (res.ok) {
          const json = await res.json();
          setValid(!!json.valid);
        } else {
          setValid(false);
        }
      } catch {
        setValid(false);
      }
    })();
  }, [token]);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Password updated. You can now sign in.");
        try {
          // Ensure any existing session is cleared so the login page doesn't
          // immediately redirect away. This also avoids confusion during testing.
          await signOut({ redirect: false });
        } catch (e) {
          // ignore signOut failures but log for debugging
          // eslint-disable-next-line no-console
          console.error("signOut failed:", e);
        }
        // Poll /api/auth/session until it returns null, or timeout after 2s.
        // This avoids the race where signOut is accepted server-side but the
        // client still believes it's authenticated due to caching or timing.
        const waitForSignOut = async (timeout = 2000, interval = 200) => {
          const start = Date.now();
          while (Date.now() - start < timeout) {
            try {
              const r = await fetch("/api/auth/session");
              if (r.ok) {
                const json = await r.json();
                if (!json) {
                  // session cleared
                  window.location.href = "/auth/login?signup=1";
                  return;
                }
              }
            } catch (e) {
              // ignore transient fetch errors
            }
            // eslint-disable-next-line no-await-in-loop
            await new Promise((res) => setTimeout(res, interval));
          }
          // Timeout: navigate anyway to ensure user sees login
          window.location.href = "/auth/login?signup=1";
        };
        waitForSignOut();
      } else {
        const json = await res.json();
        toast.error(json?.message || "Failed to reset password");
      }
    } catch (e) {
      toast.error("Failed to reset password");
    }
  };

  if (valid === null)
    return (
      <div className="mx-auto w-full max-w-md pt-6">Checking token...</div>
    );
  if (valid === false)
    return (
      <div className="mx-auto w-full max-w-md pt-6">
        Invalid or expired token.
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-md pt-6">
      <h2 className="text-foreground text-center text-2xl font-bold">
        Reset password
      </h2>
      <p className="text-muted-foreground mt-1 text-center text-sm">
        Set a new password for your account.
      </p>

      <Form methods={methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm"
        >
          <FormField
            control={control}
            name="password"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="token"
            render={({ field: f }) => <input type="hidden" {...f} />}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Set password
          </Button>
        </form>
      </Form>
    </div>
  );
}
