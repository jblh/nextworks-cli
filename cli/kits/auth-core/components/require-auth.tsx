import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/admin-header";

export interface RequireAuthProps {
  children: ReactNode;
  returnTo?: string;
  /**
   * Controls whether a minimal admin header is shown.
   * Defaults to true for DX. Consumers can disable per layout/page.
   */
  showAdminHeader?: boolean;
}

export default async function RequireAuth({
  children,
  returnTo = "/dashboard",
  showAdminHeader = true,
}: RequireAuthProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }
  return (
    <>
      {showAdminHeader && <AdminHeader />}
      {children}
    </>
  );
}

// Named export to enforce admin-only access for server-rendered pages/layouts.
export async function RequireAdmin({
  children,
  returnTo = "/dashboard",
  // By default don't render the AdminHeader here because ProtectedLayout already
  // injects it via RequireAuth. Consumers can opt-in by passing showAdminHeader.
  showAdminHeader = false,
}: RequireAuthProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    // Not signed in -> redirect to login
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }

  // Signed in but not admin -> redirect away from admin area
  if ((session.user as { role?: string }).role !== "admin") {
    redirect(returnTo);
  }

  return (
    <>
      {showAdminHeader && <AdminHeader />}
      {children}
    </>
  );
}
