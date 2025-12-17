"use client";

import { useEffect, useState, useRef } from "react";

type UseCheckUniqueResult = {
  loading: boolean;
  unique: boolean | null; // null = unknown / not checked
  error: string | null;
};

export default function useCheckUnique(
  field: string,
  value: string | undefined | null,
  delay = 500,
): UseCheckUniqueResult {
  const [loading, setLoading] = useState(false);
  const [unique, setUnique] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Clear previous timer / request
    if (timer.current) window.clearTimeout(timer.current);
    if (controllerRef.current) controllerRef.current.abort();

    // Reset state for empty values
    if (!value) {
      setLoading(false);
      setUnique(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    timer.current = window.setTimeout(() => {
      const controller = new AbortController();
      controllerRef.current = controller;

      (async () => {
        try {
          const res = await fetch("/api/users/check-unique", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ field, value }),
            signal: controller.signal,
          });
          const payload = await res.json().catch(() => null);
          if (!res.ok || !payload) {
            setError("Failed to validate");
            setUnique(null);
          } else if (payload?.success) {
            // Expecting { success: true, data: { unique: boolean } }
            setUnique(Boolean(payload.data?.unique));
          } else {
            setError(payload?.message || "Validation failed");
            setUnique(null);
          }
        } catch (e: unknown) {
          if ((e as any)?.name === "AbortError") return;
          setError("Validation failed");
          setUnique(null);
        } finally {
          setLoading(false);
          controllerRef.current = null;
        }
      })();
    }, delay);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [field, value, delay]);

  return { loading, unique, error };
}
