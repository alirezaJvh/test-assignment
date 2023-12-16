import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
            where: { email: email as string }
        })
        console.log('@@@')
        console.log(user)
        if (!user) return null
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('authorized');
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
    redirect() {
      return 'http://localhost:3000/';
    },
  },
};

export const {
  handlers: { GET, POST },
  signIn,
} = NextAuth(authOptions);
