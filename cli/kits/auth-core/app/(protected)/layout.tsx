import RequireAuth from "@/components/require-auth";

/**
 * ProtectedLayout wraps all routes under /app/(protected).
 * We delegate the optional admin header to RequireAuth via a prop, keeping
 * the control in shared components instead of env flags.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth showAdminHeader>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </RequireAuth>
  );
}
