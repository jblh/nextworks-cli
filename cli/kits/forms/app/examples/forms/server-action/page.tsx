import React from "react";
import ServerActionForm from "./form-client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});

export default async function Page({ searchParams }: any) {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";

    const parsed = schema.safeParse({ title, content });
    if (!parsed.success) {
      // For simplicity in this example, throw an error which will surface in the server logs / dev overlay.
      // In a real app, you'd return structured errors or use progressive enhancement with client-side validation.
      throw new Error("Validation failed: " + parsed.error.message);
    }

    // NOTE: The Post model requires authorId. For this example we upsert a demo author so the FK is satisfied.
    // In real apps you should resolve the current user via NextAuth session.
    const fallbackAuthorId = "__demo_author__";

    await prisma.user.upsert({
      where: { id: fallbackAuthorId },
      update: {},
      create: {
        id: fallbackAuthorId,
        email: "demo@example.com",
        name: "Demo User",
        // No password for demo account
      },
    });

    await prisma.post.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content ?? null,
        authorId: fallbackAuthorId,
      },
    });

    redirect("/examples/forms/server-action?created=1");
  }

  const params = await searchParams;
  const created = (params && (params as any).created) || false;

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Server Action Example</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        This demo shows a simple server action that validates with zod and
        creates a Post via prisma (uses a demo fallback authorId).
      </p>
      {/* Pass the server action down to the client form */}
      {/* @ts-ignore server action passed to client */}
      <ServerActionForm action={createPost} />
      {created && (
        <p className="mt-4 text-sm text-green-600">
          Post created successfully.
        </p>
      )}
    </div>
  );
}
