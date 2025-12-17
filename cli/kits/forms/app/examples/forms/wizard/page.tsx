import React from "react";
import WizardClient from "@/components/examples/wizard-client";

export default function WizardPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">3-step Wizard (Forms)</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        A minimal example showing per-step validation, state persistence, and
        final submit to an API route that returns ApiResult field errors.
      </p>
      <WizardClient />
    </div>
  );
}
