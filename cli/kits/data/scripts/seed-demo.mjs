#!/usr/bin/env node
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "password123";

  // Upsert admin user
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      role: "admin",
    },
  });

  // Create a sample post (upsert by slug, since slug is unique)
  await prisma.post.upsert({
    where: { slug: "hello-from-nextworks-demo" },
    update: {},
    create: {
      title: "Hello from Nextworks Demo",
      slug: "hello-from-nextworks-demo",
      content: "This is a demo post created by the seed script.",
      author: { connect: { email: adminEmail } },
      published: true,
    },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
