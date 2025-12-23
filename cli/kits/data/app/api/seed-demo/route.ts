import { prisma } from "@/lib/prisma";
import { jsonOk, jsonFail } from "@/lib/server/result";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return jsonFail("Not authenticated", { status: 401 });
    }

    const userId = session.user.id;

    // Create 3 sample posts for the current user
    const posts = await prisma.post.createMany({
      data: [
        {
          title: "Welcome to Nextworks",
          content: "This is a seeded post.",
          authorId: userId,
        },
        {
          title: "Seeded Demo Post",
          content: "Another seeded post for demo purposes.",
          authorId: userId,
        },
        {
          title: "Try editing me",
          content: "Edit/delete this post to test the CRUD flows.",
          authorId: userId,
        },
      ],
      skipDuplicates: true,
    });

    return jsonOk({ created: posts }, { message: "Demo data seeded" });
  } catch (e) {
    console.error(e);
    return jsonFail("Failed to seed demo data");
  }
}
