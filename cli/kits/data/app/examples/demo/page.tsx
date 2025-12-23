import React from "react";
import Link from "next/link";
import CreatePostForm from "./create-post-form";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SeedDemoButton from "./seed-demo-button";

export default async function DemoPage() {
  const session = await getServerSession(authOptions);

  const callbackUrl = "/examples/demo";

  const posts = session?.user?.id
    ? await prisma.post.findMany({
        where: { authorId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Nextworks Acceptance Demo</h1>
      <p className="text-muted-foreground mb-4 text-sm">
        This page demonstrates an end-to-end flow: sign up / log in via the Auth
        pages, then create a post using the Forms + Data APIs.
      </p>

      <div className="mb-6">
        {!session?.user ? (
          <div className="border-border bg-card mb-3 rounded-md border p-3">
            <p className="text-muted-foreground text-sm">
              You are not signed in. To try the end-to-end demo, create an
              account or log in and return here. Quick links:
              <Link
                href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="text-primary underline"
              >
                Sign up
              </Link>{" "}
              or{" "}
              <Link
                href={`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="text-primary underline"
              >
                Log in
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mb-3 flex items-center gap-3">
            <span className="text-muted-foreground text-sm">
              Signed in as{" "}
              <strong>{session.user?.email ?? session.user?.name}</strong>
            </span>
            <SeedDemoButton />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/examples/forms/basic" className="text-primary underline">
            Form primitives example
          </Link>
          <Link
            href="/examples/forms/server-action"
            className="text-primary underline"
          >
            Server action example
          </Link>
        </div>
      </div>

      <CreatePostForm />

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Your posts</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
                        No posts yet. Use the form above or click &quot;Seed demo data&quot; to create

            sample posts.
          </p>
        ) : (
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id} className="bg-card rounded-md border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">{p.title}</div>
                    {p.excerpt ? (
                      <div className="text-muted-foreground text-sm">
                        {p.excerpt}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {p.published ? "Public" : "Private"}
                  </div>
                </div>
                <div className="text-muted-foreground mt-2 text-xs">
                  {p.createdAt ? format(new Date(p.createdAt), "PPpp") : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-muted-foreground mt-6 text-sm">
        Notes: The post creation will default to the currently signed-in user
        (via session) if you are signed in. If you are not signed in the API
        will return an error and you can use the signup/login links above.
      </p>
    </div>
  );
}
