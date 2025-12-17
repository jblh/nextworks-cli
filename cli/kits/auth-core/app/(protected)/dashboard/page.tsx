import { requireAuth } from "@/lib/auth-helpers";
import Dashboard from "@/components/auth/dashboard";

export default async function DashboardPage() {
  const session = await requireAuth("/dashboard");

  return <Dashboard session={session} />;
}
