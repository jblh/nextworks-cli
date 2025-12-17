#!/usr/bin/env node

import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Reading existing PasswordReset rows with token column...");
  const rows = await prisma.$queryRaw`SELECT id, token FROM "PasswordReset" WHERE token IS NOT NULL`;
  console.log(`Found ${rows.length} rows`);
  for (const row of rows) {
    const id = row.id;
    const token = row.token;
    if (!token) continue;
    const hash = createHash("sha256").update(token).digest("hex");
    await prisma.passwordReset.update({ where: { id }, data: { tokenHash: hash } });
    console.log(`Updated ${id}`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => await prisma.$disconnect());
