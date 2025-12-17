"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MinimalLogoutButton from "@/components/auth/minimal-logout-button";

/**
 * Minimal admin header with basic links.
 * - Uses only Next.js primitives and basic utility classes
 * - Independent from any UI kit
 */
export default function AdminHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const linkClass = (href: string) =>
    [
      "no-underline border-b-2 pb-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm",
      isActive(href)
        ? "text-foreground border-foreground"
        : "text-foreground/70 border-transparent",
    ].join(" ");

  return (
    <header className="bg-background/50 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <nav className="flex items-center gap-4 text-sm">
          <Link
            className={linkClass("/dashboard")}
            href="/dashboard"
            aria-current={isActive("/dashboard") ? "page" : undefined}
          >
            Dashboard
          </Link>
          <Link
            className={linkClass("/admin/users")}
            href="/admin/users"
            aria-current={isActive("/admin/users") ? "page" : undefined}
          >
            Users
          </Link>
          <Link
            className={linkClass("/admin/posts")}
            href="/admin/posts"
            aria-current={isActive("/admin/posts") ? "page" : undefined}
          >
            Posts
          </Link>
        </nav>
        <MinimalLogoutButton />
      </div>
    </header>
  );
}
