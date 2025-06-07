import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user?.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],

  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt", // needed for jwt-based expiration
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60, // optional, 1 hour in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      // If user logs in, add custom expiry time
      if (user) {
        token.id = user.id;
        token.exp = now + 60 * 60; // 1 hour expiry
      }

      // If token exists and is expired, return empty object
      if (token.exp && now > token.exp) {
        console.log("Token expired");
        return {};
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      if (token?.exp) session.expires = new Date(token.exp * 1000).toISOString() as any;
      return session;
    }
  },
} satisfies NextAuthConfig;
