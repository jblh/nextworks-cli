import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function requireAuth(returnTo: string = "/dashboard") {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }
  return session;
}

export async function requireAdmin(returnTo: string = "/dashboard") {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }
  if ((session.user as { role?: string }).role !== "admin") {
    redirect(returnTo);
  }
  return session;
}

export async function requireAdminApi() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  if ((session.user as { role?: string }).role !== "admin") return null;
  return session;
}
