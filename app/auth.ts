/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/app/lib/prisma";

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        if (!user) return null;
        const passwordsMatch = atob(user.password) === password;
        if (passwordsMatch)
          return { id: user.id, name: user.name, email: user.email };
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (!isLoggedIn && !isOnLogin) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
    redirect() {
      return "http://localhost:3000/";
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // eslint-disable
      session.token = token;
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  signIn,
} = NextAuth(authOptions);
