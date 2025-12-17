"use client";

// Minimal, UI-kit-free logout button for admin header
// Uses only next-auth/react and basic classes
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function MinimalLogoutButton({
  label = "Log out",
  loggingOutLabel = "Logging out...",
  callbackUrl = "/auth/login",
}: {
  label?: string;
  loggingOutLabel?: string;
  callbackUrl?: string;
}) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl });
    } finally {
      // NextAuth will redirect; keep a guard to avoid re-clicks
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="rounded border px-3 py-1 text-sm hover:bg-muted disabled:opacity-60"
      aria-label={loading ? loggingOutLabel : label}
    >
      {loading ? loggingOutLabel : label}
    </button>
  );
}
