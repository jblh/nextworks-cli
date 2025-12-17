#!/usr/bin/env node

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function promote(email) {
  if (!email) {
    console.error("Usage: node scripts/promote-admin.mjs <email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`User not found: ${email}`);
    process.exit(2);
  }

  if (user.role === "admin") {
    console.log(`User ${email} is already an admin`);
    process.exit(0);
  }

  await prisma.user.update({ where: { email }, data: { role: "admin" } });
  console.log(`Promoted ${email} to admin`);
  process.exit(0);
}

const email = process.argv[2];
promote(email).catch((err) => {
  console.error(err);
  process.exit(1);
});
