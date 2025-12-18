"use client";

import Link from "next/link";

export default function AdminUsersPlaceholderPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Users admin requires the Data kit
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This project has the auth-core kit installed, which provides
        authentication and basic admin scaffolding.
        <br />
        To manage users (list, filter, edit, etc.), install the Data kit and
        add its admin routes to your app.
      </p>

      <div className="mt-6 flex items-center gap-3 text-sm">
        <Link
          href="/dashboard"
          className="text-primary underline-offset-4 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}