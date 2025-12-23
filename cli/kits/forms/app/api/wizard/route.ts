import { NextRequest } from "next/server";
import {
  jsonOk,
  jsonFromZod,
  jsonFromPrisma,
  jsonFail,
} from "@/lib/server/result";
import { wizardServerSchema } from "@/lib/validation/wizard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = wizardServerSchema.parse(body);
    // coerce to typed server input
    void (parsed satisfies import("@/lib/validation/wizard").WizardServerValues);
    // require session to attach author
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return jsonFail("Not authenticated", { status: 401 });
    const userId = session.user.id;
    // map visibility to published flag
    const published = parsed.visibility === "public";
    // create Post record (persist full set of fields)
    const data = {
      title: parsed.title,
      slug: parsed.slug || undefined,
      content: parsed.content || undefined,
      excerpt: parsed.excerpt || undefined,
      tags: parsed.tags || undefined,
      published,
      author: { connect: { id: userId } },
    } satisfies Parameters<typeof prisma.post.create>[0]["data"];
    const created = await prisma.post.create({ data });
    // return a cleaned, typed result object (maps published -> visibility)
    const result: import("@/lib/validation/wizard").WizardServerValues & {
      id: string;
      createdAt: Date;
    } = {
      title: created.title,
      slug: created.slug ?? "",
      content: created.content ?? "",
      excerpt: created.excerpt ?? "",
      visibility: created.published ? "public" : "private",
      tags: created.tags ?? "",
      id: created.id,
      createdAt: created.createdAt,
    };
    return jsonOk(result, { status: 201, message: "Created" });
  } catch (e: unknown) {
    // zod errors
    // prisma errors
        try {
      // detect zod error (ZodError has an `issues` array)
      if (
        typeof e === "object" &&
        e !== null &&
        "issues" in e &&
        Array.isArray((e as { issues?: unknown }).issues)
      ) {
        return jsonFromZod(e as never);
      }
    } catch {}

    try {
      return jsonFromPrisma(e);
    } catch {
      console.error(e);
      return jsonOk(null, { message: "Unknown error" });
    }
  }
}
