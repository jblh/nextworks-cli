import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";
import { zodErrorToFieldErrors } from "@/lib/api/errors";

type JwtTokenWithAppClaims = {
  id?: string;
  role?: string;
  image?: string | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email("Invalid email address"),
          password: z.string().min(1, "Password is required"),
        });

        try {
          const { email, password } = schema.parse(credentials ?? {});

          const user = await prisma.user.findFirst({
            where: {
              email: {
                equals: email,
                mode: "insensitive",
              },
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
            },
          });

          if (!user || !user.password) {
            throw new Error(
              JSON.stringify({
                message: "Invalid credentials",
                errors: { email: "Email not found" },
              }),
            );
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error(
              JSON.stringify({
                message: "Invalid credentials",
                errors: { password: "Incorrect password" },
              }),
            );
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          } as unknown as import("next-auth").User;
        } catch (err: unknown) {
          if (err instanceof z.ZodError) {
            throw new Error(
              JSON.stringify({
                message: "Validation failed",
                errors: zodErrorToFieldErrors(err),
              }),
            );
          }
          try {
            if (err instanceof Error) {
              JSON.parse(err.message);
              throw err; // already structured
            }
          } catch {
            throw new Error(
              JSON.stringify({
                message: "Login failed",
                errors: { email: "Invalid email or password" },
              }),
            );
          }
        }

        return null;
      },
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
          }),
        ]
      : []),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const t = token as typeof token & JwtTokenWithAppClaims;

      if (user) {
        // NextAuth's `user` type doesn't include custom properties like `role`.
        // Narrow via runtime checks instead of `any`.
        const u = user as unknown as Record<string, unknown>;

        if (typeof u.id === "string") t.id = u.id;

        token.name = user.name ?? "";
        token.email = user.email ?? "";

        if (typeof u.role === "string") {
          t.role = u.role;
        } else {
          t.role = t.role ?? "user";
        }
      }

      if (trigger === "update" && session) {
        if (typeof session.name === "string") token.name = session.name;
        if (typeof session.email === "string") token.email = session.email;

        const s = session as unknown as Record<string, unknown>;
        if (typeof s.role === "string") t.role = s.role;

        if (s.image === null || typeof s.image === "string") {
          t.image = (s.image as string | null) ?? null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const t = token as typeof token & JwtTokenWithAppClaims;

      if (session.user) {
        if (typeof t.id === "string") session.user.id = t.id;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";

        if (typeof t.role === "string") {
          (session.user as unknown as Record<string, unknown>).role = t.role;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: { signIn: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
