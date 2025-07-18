// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Use MongoDB to store user, session, and account data
  adapter: MongoDBAdapter(clientPromise),

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          // Return a user object that NextAuth can use
          return {
            id: user._id.toString(),
            username: user.username,
          };
        }

        return null;
      },
    }),
  ],

  // Use JWT for session management
  session: {
    strategy: "jwt",
  },

  // Callbacks are used to control what happens when an action is performed.
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // When a user signs in, add their ID and username to the token
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user's ID and username to the session object
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
      }
      return session;
    },
  },

  // Specify a custom sign-in page
  pages: {
    signIn: "/signin",
  },

  // Your secret for signing the JWT
  secret: process.env.NEXTAUTH_SECRET,
};
