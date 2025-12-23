"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SeedDemoButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seed-demo", { method: "POST" });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        toast.error(payload?.message || "Failed to seed demo data");
        setLoading(false);
        return;
      }
      toast.success("Demo data seeded");
      // Refresh to show new posts if the page lists them
      router.refresh();
    } catch {
      toast.error("Failed to seed demo data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSeed} disabled={loading} variant="outline">
      {loading ? "Seeding..." : "Seed demo data"}
    </Button>
  );
}
