import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('call here');
        const { username, password } = credentials;
        console.log(username)
        console.log(password)
        return null
        const res = await fetch(
          'api/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`,
          },
        );
        // if (res.status === 200) {
        //   const data = await res.json();
        //   return data;
        // }
        // return null;
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
