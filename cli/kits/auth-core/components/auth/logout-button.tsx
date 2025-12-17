"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LogoutButtonProps {
  className?: string;
  label?: string;
  loggingOutLabel?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  callbackUrl?: string;
}

export default function LogoutButton({
  className,
  label = "Log out",
  loggingOutLabel = "Logging out...",
  variant = "outline",
  size = "sm",
  callbackUrl = "/auth/login",
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl });
    } finally {
      // no-op; NextAuth will redirect
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleSignOut}
      disabled={loading}
      aria-label={loading ? loggingOutLabel : label}
    >
      {loading ? loggingOutLabel : label}
    </Button>
  );
}
