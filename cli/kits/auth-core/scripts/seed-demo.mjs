import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "password123";

  const hashed = await bcrypt.hash(password, 10);

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, name: "Seed Admin", password: hashed, role: "admin" },
    });
    console.log("Created admin user:", email);
  } else {
    user = await prisma.user.update({ where: { email }, data: { role: "admin", password: hashed } });
    console.log("Updated admin user:", email);
  }

  const postsData = [
    { title: "Welcome to Nextworks", content: "This is a seeded post.", authorId: user.id, published: true },
    { title: "Seeded Demo Post", content: "Another seeded post.", authorId: user.id, published: false },
  ];

  for (const p of postsData) {
    const existing = await prisma.post.findFirst({ where: { title: p.title } });
    if (existing) await prisma.post.update({ where: { id: existing.id }, data: p });
    else await prisma.post.create({ data: p });
  }

  console.log("Seeded posts.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => await prisma.$disconnect());
