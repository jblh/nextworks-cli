import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";
import { zodErrorToFieldErrors } from "@/lib/api/errors";

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
          } as any;
        } catch (err: any) {
          if (err instanceof z.ZodError) {
            throw new Error(
              JSON.stringify({
                message: "Validation failed",
                errors: zodErrorToFieldErrors(err),
              }),
            );
          }
          try {
            JSON.parse(err?.message);
            throw err; // already structured
          } catch {
            throw new Error(
              JSON.stringify({
                message: "Login failed",
                errors: { email: "Invalid email or password" },
              }),
            );
          }
        }
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
      if (user) {
        (token as any).id = (user as any).id;
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        (token as any).role =
          (user as any).role ?? (token as any).role ?? "user";
      }
      if (trigger === "update" && session) {
        const s = session as any;
        if (typeof s.name === "string") token.name = s.name;
        if (typeof s.email === "string") token.email = s.email;
        if (typeof s.role === "string") (token as any).role = s.role;
        if (s.image === null || typeof s.image === "string")
          (token as any).image = s.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id as string;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";
        (session.user as any).role = (token as any).role ?? "user";
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
