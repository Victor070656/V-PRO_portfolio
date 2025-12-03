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
        userType: { label: "User Type", type: "text" } // Hidden field for role distinction
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db();

        // Check which collection to query based on user type
        const userType = credentials.userType as string;
        const collection = userType === "admin" ? "users" : "students";

        const user = await db
          .collection(collection)
          .findOne({ username: credentials.username });

        // In production, use proper password hashing
        // const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        const passwordsMatch = user && user.password === credentials.password;

        if (passwordsMatch) {
          // Return a user object that NextAuth can use
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: userType === "admin" ? "admin" : "student",
            name: user.profile?.firstName || user.username,
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
        // When a user signs in, add their ID, username, and role to the token
        token.id = user.id;
        token.username = (user as any).username;
        token.role = (user as any).role;
        token.email = (user as any).email;
        token.name = (user as any).name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user's ID, username, and role to the session object
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
        (session.user as any).role = token.role;
        (session.user as any).email = token.email;
        (session.user as any).name = token.name;
      }
      return session;
    },
  },

  // Specify a custom sign-in page
  pages: {
    signIn: "/auth/signin",
  },

  // Your secret for signing the JWT
  secret: process.env.NEXTAUTH_SECRET,
};
