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
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('call here');
        const { email, password } = credentials;
        console.log(password)
        const user = await prisma.user.findUnique({
            where: { email }
        })
        console.log(user)
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('authorized');
      const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false;
    //   }
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
