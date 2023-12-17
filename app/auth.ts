import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { prisma } from '@/app/lib/prisma';

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials: {email: string, password: string}) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
            where: { email: email as string }
        })
        if (!user) return null
        console.log(user)
        const passwordsMatch = atob(user.password) === password
        if (passwordsMatch) return { name: user.name, emial: user.email };
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('authorized');
      console.log(auth)
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (!isLoggedIn && !isOnLogin) {
        return Response.redirect(new URL('/login', nextUrl));
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
