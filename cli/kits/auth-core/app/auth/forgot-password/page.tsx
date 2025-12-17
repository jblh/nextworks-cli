import React from "react";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  // Guard rendered server-side: the feature is opt-in via NEXTWORKS_ENABLE_PASSWORD_RESET=1
  if (process.env.NEXTWORKS_ENABLE_PASSWORD_RESET !== "1") {
    return (
      <div className="mx-auto w-full max-w-md pt-6">
        <h2 className="text-foreground text-center text-2xl font-bold">
          Not found
        </h2>
        <p className="text-muted-foreground mt-1 text-center text-sm">
          Password reset is disabled.
        </p>
      </div>
    );
  }

  // Render the client component (the form)
  return <ForgotPasswordForm />;
}
