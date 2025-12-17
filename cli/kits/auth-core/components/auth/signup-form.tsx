"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  type JSX,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signupSchema, type SignupFormValues } from "@/lib/validation/forms";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormControl } from "@/components/ui/form/form-control";
import { toast } from "sonner";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";
import useCheckUnique from "@/components/hooks/useCheckUnique";

export interface SignupFormProps {
  id?: string;
  className?: string;

  /** Where to redirect if the user is already authenticated. Default: "/dashboard" */
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
    name?: string;
    email?: string;
    password?: string;
    submit?: string;
    submitting?: string;
    github?: string;
    success?: string;
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

export default function SignupForm({
  id,
  className,
  defaultRedirect = "/dashboard",
  showGithub = true,
  showDivider = true,
  headingText = {
    text: "Create your account",
    className: "text-2xl font-bold text-foreground text-center",
  },
  subheadingText = {
    text: "Start your free trial in minutes",
    className: "mt-1 text-sm text-muted-foreground text-center",
  },
  labels = {
    name: "Name",
    email: "Email",
    password: "Password",
    submit: "Create account",
    submitting: "Creating account...",
    github: "Continue with GitHub",
    success: "Account created. You can now sign in.",
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
  ariaLabel = "Signup form",
}: SignupFormProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const redirectTo = searchParams.get("callbackUrl") || defaultRedirect;
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [githubAvailable, setGithubAvailable] = useState(false);

  const formMethods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    setError: setFieldError,
    formState: { isSubmitting },
  } = formMethods;

  const emailValue = formMethods.watch("email");
  const {
    loading: checkingEmail,
    unique: emailUnique,
    error: emailUniqueError,
  } = useCheckUnique("email", emailValue, 500);

  const useDebouncedValidator = (
    fn: (v: any) => Promise<boolean | string | undefined>,
    delay = 500,
  ) => {
    const timer = useRef<number | undefined>(undefined);
    return useCallback(
      (value: any): Promise<boolean | string | undefined> => {
        if (timer.current) window.clearTimeout(timer.current);
        return new Promise((resolve) => {
          timer.current = window.setTimeout(async () => {
            try {
              const res = await fn(value);
              resolve(res);
            } catch {
              resolve(true);
            }
          }, delay);
        });
      },
      [fn, delay],
    );
  };

  const checkEmailAvailability = async (
    email: string,
  ): Promise<boolean | string | undefined> => {
    if (!email) return true;
    try {
      const res = await fetch(
        `/api/users/check-email?email=${encodeURIComponent(email)}`,
      );
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        return true;
      }
      return payload.data?.available ? true : "Email already in use";
    } catch {
      return true;
    }
  };

  const debouncedValidateEmail = useDebouncedValidator(
    checkEmailAvailability,
    500,
  );

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(redirectTo);
    }
  }, [status, session, router, redirectTo]);

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setGithubAvailable(!!providers?.github);
    })();
  }, []);

  const onSubmit = async (data: SignupFormValues) => {
    setFormError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload
          ? mapApiErrorsToForm(formMethods, payload)
          : undefined;
        setFormError(msg || payload?.message || "Signup failed");
        return;
      }

      router.push(
        `/auth/login?signup=1&callbackUrl=${encodeURIComponent(redirectTo)}`,
      );
    } catch (e: unknown) {
      const err = e as Error;
      setFormError(err.message || "Unknown error");
    }
  };

  const handleGithubSignup = async () => {
    setIsGithubLoading(true);
    setFormError(null);
    const result = await signIn("github", {
      redirect: false,
      callbackUrl: redirectTo,
    });
    if (result?.error) {
      setFormError("GitHub login failed. Please try again.");
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

      {formError && (
        <div
          className={cn(alerts.errorClassName)}
          role="alert"
          aria-live="polite"
        >
          {formError}
        </div>
      )}
      {success && (
        <div
          className={cn(alerts.successClassName)}
          role="status"
          aria-live="polite"
        >
          {labels.success}
        </div>
      )}

      {showGithub && githubAvailable && (
        <>
          <div className={cn(providerWrapper.className)}>
            <Button
              variant={providerButton.variant}
              size={providerButton.size}
              className={cn(providerButton.className)}
              onClick={handleGithubSignup}
              disabled={isGithubLoading}
              aria-label={labels.github}
            >
              {labels.github}
            </Button>
          </div>
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
            name="name"
            render={({ field: f }) => (
              <FormItem className={cn(field.className)}>
                <FormLabel className={cn(label.className)}>
                  {labels.name}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    autoComplete="name"
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
            name="email"
            rules={{ validate: debouncedValidateEmail }}
            render={({ field: f }) => (
              <FormItem className={cn(field.className)}>
                <FormLabel className={cn(label.className)}>
                  {labels.email}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={cn(input.className)}
                    {...f}
                  />
                </FormControl>

                <div aria-live="polite" className="mt-1">
                  {checkingEmail ? (
                    <span className="text-muted-foreground text-sm">
                      Checking…
                    </span>
                  ) : emailUnique === true ? (
                    <span className="text-sm text-green-600">
                      Email available
                    </span>
                  ) : emailUnique === false ? (
                    <span className="text-destructive text-sm">
                      Email already in use
                    </span>
                  ) : null}
                </div>

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
                    type="password"
                    autoComplete="new-password"
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
            disabled={isSubmitting || emailUnique === false}
            aria-label={isSubmitting ? labels.submitting : labels.submit}
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </Button>
        </form>
      </Form>
      <p className="mt-3 text-center text-sm">
        Already have an account?{" "}
        <Link
          href={`/auth/login?callbackUrl=${encodeURIComponent(searchParams.get("callbackUrl") || defaultRedirect)}`}
          className="text-primary underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
