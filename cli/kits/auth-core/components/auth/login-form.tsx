"use client";

import React, { useEffect, useState, type JSX } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginFormValues } from "@/lib/validation/forms";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormControl } from "@/components/ui/form/form-control";
import { toast } from "sonner";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";

export interface LoginFormProps {
  id?: string;
  className?: string;

  /** Fallback redirect when no callbackUrl is present in the URL. Default: "/dashboard" */
  defaultRedirect?: string;

  /** Show the OAuth (GitHub) provider button. Default: true */
  showGithub?: boolean;

  /** Show the divider between providers and form fields. Default: true */
  showDivider?: boolean;

  /** Optional header text above the form */
  headingText?: { text?: string; className?: string } | null;
  /** Optional subheading text under the header */
  subheadingText?: { text?: string; className?: string } | null;

  /** Text labels you might want to override */
  labels?: {
    email?: string;
    password?: string;
    submit?: string;
    submitting?: string;
    github?: string;
    errorGeneric?: string;
  };

  /** Slots for styling overrides (similar to Navbar) */
  container?: { className?: string };
  headerWrapper?: { className?: string };
  providerWrapper?: { className?: string };
  providerButton?: {
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
  divider?: {
    wrapperClassName?: string;
    lineClassName?: string;
    textClassName?: string;
  };
  form?: { className?: string };
  field?: { className?: string };
  label?: { className?: string };
  input?: { className?: string };
  submitButton?: {
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
  alerts?: {
    errorClassName?: string;
    successClassName?: string;
  };

  /** ARIA label for the form */
  ariaLabel?: string;
}

export default function LoginForm({
  id,
  className,
  defaultRedirect = "/dashboard",
  showGithub = true,
  showDivider = true,
  headingText = {
    text: "Welcome back",
    className: "text-2xl font-bold text-foreground text-center",
  },
  subheadingText = {
    text: "Enter your credentials to sign in",
    className: "mt-1 text-sm text-muted-foreground text-center",
  },
  labels = {
    email: "Email",
    password: "Password",
    submit: "Log In",
    submitting: "Logging in...",
    github: "Continue with GitHub",
    errorGeneric: "Login failed. Please try again.",
  },
  container = { className: "mx-auto w-full max-w-md pt-6" },
  headerWrapper = { className: "mb-4" },
  providerWrapper = { className: "mb-6" },
  providerButton = {
    variant: "outline",
    size: "default",
    className:
      "w-full shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
  },
  divider = {
    wrapperClassName: "relative mb-6",
    lineClassName: "w-full border-t",
    textClassName: "bg-background text-muted-foreground px-2",
  },
  form = {
    className:
      "space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm",
  },
  field = { className: "space-y-2" },
  label = { className: "" },
  input = { className: "" },
  submitButton = {
    variant: "default",
    size: "default",
    className:
      "w-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl",
  },
  alerts = {
    errorClassName:
      "mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive",
    successClassName:
      "mb-4 rounded-md border border-primary/20 bg-primary/10 p-3 text-sm text-foreground",
  },
  ariaLabel = "Login form",
}: LoginFormProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;

  const [error, setError] = useState<string | null | undefined>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [githubAvailable, setGithubAvailable] = useState(false);
  const [githubConfigured, setGithubConfigured] = useState(false);

  const formMethods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/providers");
        if (res.ok) {
          const json = await res.json();
          const github = json?.github ?? { configured: false, enabled: false };
          setGithubConfigured(!!github.configured);
          setGithubAvailable(!!github.enabled);
        } else {
          const providers = await (
            await import("next-auth/react")
          ).getProviders();
          setGithubAvailable(!!providers?.github);
        }
      } catch {
        try {
          const providers = await (
            await import("next-auth/react")
          ).getProviders();
          setGithubAvailable(!!providers?.github);
        } catch {
          setGithubAvailable(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const STORAGE_KEY = "signup_toast_shown";
    const isSignup = searchParams.get("signup") === "1";

    if (isSignup) {
      try {
        if (!sessionStorage.getItem(STORAGE_KEY)) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setSuccess("Account created. You can now sign in.");
          toast.success("Account created. You can now sign in.", {
            id: "signup-success",
          });

          const params = new URLSearchParams(searchParams);
          params.delete("signup");
          router.replace(`/auth/login?${params.toString()}`, { scroll: false });
        }
      } catch {
        setSuccess("Account created. You can now sign in.");
        toast.success("Account created. You can now sign in.", {
          id: "signup-success",
        });
        const params = new URLSearchParams(searchParams);
        params.delete("signup");
        router.replace(`/auth/login?${params.toString()}`, { scroll: false });
      }
    } else {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
    }

    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;
      const resolve = (cb: string) => {
        try {
          const u = new URL(cb);
          if (u.origin === window.location.origin)
            return `${u.pathname}${u.search}${u.hash}`;
        } catch {}
        return cb;
      };
      window.location.assign(resolve(callbackUrl));
    }
  }, [status, session, router, searchParams, defaultRedirect]);

    const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setSuccess(null);

    const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;

    try {
      const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
      const csrfJson = await csrfRes.json().catch(() => null);
      const csrfToken = csrfJson?.csrfToken;

      const body = new URLSearchParams();
      if (csrfToken) body.set("csrfToken", csrfToken);
      body.set("callbackUrl", callbackUrl);
      body.set("json", "true");
      body.set("email", data.email);
      body.set("password", data.password);

      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        redirect: "manual",
      });

      const text = await res.text().catch(() => null);
      let parsed: unknown = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
                        if (parsed && typeof parsed === "object") {
          const msg = mapApiErrorsToForm(formMethods, parsed as never);


          const parsedMessage =
            "message" in parsed && typeof parsed.message === "string"
              ? parsed.message
              : null;

          setError(
            msg ||
              parsedMessage ||
              (labels.errorGeneric ?? "Login failed. Please try again."),
          );
        } else {
          setError(labels.errorGeneric ?? "Login failed. Please try again.");
        }
        return;
      }

            setSuccess("Logged in successfully");
      toast.success("Logged in successfully");

      const dest =
        parsed && typeof parsed === "object" && "url" in parsed
          ? String(parsed.url)
          : callbackUrl;
      const resolve = (cb: string) => {
        try {
          const u = new URL(cb);
          if (u.origin === window.location.origin)
            return `${u.pathname}${u.search}${u.hash}`;
        } catch {}
        return cb;
      };

      window.location.assign(resolve(dest));
    } catch {
      setError(labels.errorGeneric ?? "Login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    setIsGithubLoading(true);
    setError(null);
    const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;

    if (!githubConfigured && githubAvailable) {
      setError(
        "GitHub provider is not configured on the server. Contact the site administrator.",
      );
      setIsGithubLoading(false);
      return;
    }

    const result = await signIn("github", { redirect: false, callbackUrl });
    if (result?.error) {
      setError("GitHub login failed. Please try again.");
      setIsGithubLoading(false);
    }
  };

  return (
    <div
      id={id}
      className={cn(container.className, className)}
      aria-label={ariaLabel}
    >
      {(headingText?.text || subheadingText?.text) && (
        <div className={cn(headerWrapper.className)}>
          {headingText?.text && (
            <h2 className={cn("font-poppins", headingText.className)}>
              {headingText.text}
            </h2>
          )}
          {subheadingText?.text && (
            <p className={cn(subheadingText.className)}>
              {subheadingText.text}
            </p>
          )}
        </div>
      )}

            {error && (
        <div
          className={cn(alerts.errorClassName)}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className={cn(alerts.successClassName)}
          role="status"
          aria-live="polite"
        >
          {success}
        </div>
      )}


      {showGithub && githubAvailable && (
        <>
          <div className={cn(providerWrapper.className)}>
            <Button
              variant={providerButton.variant}
              size={providerButton.size}
              className={cn(providerButton.className)}
              onClick={handleGithubLogin}
              disabled={isGithubLoading || !githubConfigured}
              aria-label={labels.github}
            >
              {labels.github}
            </Button>
          </div>

          {!githubConfigured && githubAvailable && (
            <div className="text-muted-foreground mb-4 text-center text-sm">
              GitHub sign-in is visible for demos but not configured. Please set
              GITHUB_ID and GITHUB_SECRET in your environment to enable it.
            </div>
          )}

          {showDivider && (
            <div className={cn(divider.wrapperClassName)}>
              <div className="absolute inset-0 flex items-center">
                <span className={cn(divider.lineClassName)} />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className={cn(divider.textClassName)}>or</span>
              </div>
            </div>
          )}
        </>
      )}

      <Form methods={formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className={cn(form.className)}>
          <FormField
            control={control}
            name="email"
            render={({ field: f }) => (
              <FormItem className={cn(field.className)}>
                <FormLabel className={cn(label.className)}>
                  {labels.email}
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={cn(input.className)}
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field: f }) => (
              <FormItem className={cn(field.className)}>
                <FormLabel className={cn(label.className)}>
                  {labels.password}
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="At least 6 characters"
                    className={cn(input.className)}
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={submitButton.variant}
            size={submitButton.size}
            className={cn(submitButton.className)}
            disabled={isSubmitting}
            aria-label={isSubmitting ? labels.submitting : labels.submit}
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </Button>
        </form>
      </Form>
      <p className="mt-3 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-primary underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
