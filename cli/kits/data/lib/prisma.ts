import "server-only";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

if (process.env.NODE_ENV === "development" && process.platform === "win32") {
  // Dev-only hint for Windows users hitting Prisma + Turbopack symlink issues
  // (e.g. "create symlink to ../../../../node_modules/@prisma/client" with os error 1314).
  // This is intentionally a console.warn so it surfaces clearly but only in dev.
  // See docs/DATA_QUICKSTART.md for full details.
  console.warn(
    "[nextworks][data] On Windows with Next 16+ and Prisma, enable Windows Developer Mode or run your dev server from an elevated terminal to avoid Prisma symlink errors (os error 1314). See DATA_QUICKSTART.md for details."
  );
}
