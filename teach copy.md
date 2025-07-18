# Comprehensive Guide: Next.js Authentication with NextAuth.js and MongoDB

This guide will walk you through setting up a robust authentication system in your Next.js application using NextAuth.js, with MongoDB as the database to store user and session information.

We'll cover:

- Setting up NextAuth.js with the App Router.
- Using the MongoDB Adapter to persist data.
- Implementing an OAuth provider (Google).
- Protecting pages and API routes on both the client and server.
- Creating UI components for signing in and out.

## Prerequisites

- A Next.js project (using the App Router).
- A [MongoDB Atlas](https://www.mongodb.com/atlas/database) account and a free-tier cluster.
- Node.js and npm/yarn/pnpm installed.

---

## Step 1: Install Dependencies

First, let's install `next-auth`, the MongoDB adapter, and `bcrypt` for password hashing.

```bash
npm install next-auth @next-auth/mongodb-adapter mongodb bcrypt
npm install --save-dev @types/bcrypt
```

- `next-auth`: The core library.
- `@next-auth/mongodb-adapter`: The adapter that allows NextAuth.js to use MongoDB.
- `mongodb`: The official MongoDB driver for Node.js.
- `bcrypt`: A library for hashing passwords, which we'll use for the Credentials provider.
- `@types/bcrypt`: TypeScript definitions for bcrypt.

---

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root of your project to store sensitive credentials. Never commit this file to version control.

```.env.local
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
# You can generate a secret with: `openssl rand -base64 32`
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Important:**

- `MONGODB_URI`: You'll get this from your MongoDB Atlas cluster. Go to your cluster, click "Connect", select "Drivers", and copy the connection string.
- `NEXTAUTH_SECRET`: A secret key used to sign tokens and cookies.
- `NEXTAUTH_URL`: The canonical URL of your application. For local development, this is `http://localhost:3000`.
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: You'll get these from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) when you set up an OAuth 2.0 Client ID. Remember to add `http://localhost:3000/api/auth/callback/google` to the "Authorized redirect URIs".

---

## Step 3: Set up MongoDB Connection

It's a best practice to create a utility file to manage the MongoDB connection. This helps in reusing the connection across your app, which is efficient in a serverless environment.

Create a file at `lib/mongodb.ts`.

```typescript
// lib/mongodb.ts

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
```

This code ensures that you don't create a new connection on every request, which is crucial for performance.

---

## Step 4: Create the NextAuth.js API Route

This is the heart of the NextAuth.js setup. It's a dynamic API route that handles all authentication requests (like sign-in, sign-out, callbacks, etc.).

Create the file `app/api/auth/[...nextauth]/route.ts`.

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Use MongoDB to store user, session, and account data
  adapter: MongoDBAdapter(clientPromise),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (passwordsMatch) {
          // Return a user object that NextAuth can use
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email, // Optional: if you store email
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

Here's what's happening:

- `MongoDBAdapter(clientPromise)`: We tell NextAuth.js to use our MongoDB connection for persistence. It will automatically create collections (`users`, `accounts`, `sessions`) in your database.
- `providers`: An array of authentication methods. We've now correctly configured both `GoogleProvider` and `CredentialsProvider`.
- `session: { strategy: "jwt" }`: This ensures that sessions are handled with JSON Web Tokens, which is a secure and standard practice.
- `callbacks`: We use the `jwt` and `session` callbacks to enrich the token and session objects with the user's database ID and username, making this data available on the client.
- `pages: { signIn: "/signin" }`: This tells NextAuth.js to redirect users to our custom `/signin` page when they need to authenticate.

---

## Step 5: Provide Session Context

To access session data in client components, we need to wrap our application with the `SessionProvider` from `next-auth/react`.

First, create a client-side provider component at `components/AuthProvider.tsx`.

```typescript
// components/AuthProvider.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Now, use this `AuthProvider` in your root layout (`app/layout.tsx`) to make the session available throughout your app.

```diff
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -1,13 +1,16 @@
 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
 import "./globals.css";
+import AuthProvider from "@/components/AuthProvider";

 const inter = Inter({ subsets: ["latin"] });

 export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
 };

 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <html lang="en">
-      <body className={inter.className}>{children}</body>
+      <body className={inter.className}>
+        <AuthProvider>{children}</AuthProvider>
+      </body>
     </html>
   );
 }
```

---

## Step 6: Accessing Session Data

Now that everything is set up, you can access the user's session data to protect pages or render content conditionally.

### On the Client (Client Components)

Use the `useSession` hook. It provides the `session` data and a `status` which can be `loading`, `authenticated`, or `unauthenticated`.

```typescript
// Example Client Component
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  );
}
```

### On the Server (Server Components & API Routes)

Use `getServerSession` with the `authOptions` you exported earlier.

**In a Server Component (e.g., `app/dashboard/page.tsx`):**

```typescript
// app/dashboard/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If the user is not logged in, redirect to the home page
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {session.user?.name}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
}
```

---

### Create a Sign-Up Route (Optional)

If you're using the `CredentialsProvider`, you'll need a way for users to register. Here is a simple API route for user registration.

Create the file `app/api/register/route.ts`.

```typescript
// app/api/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Missing username, email, or password" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if the username or email already exists
    const existingUser = await db
      .collection("users")
      .findOne({ $or: [{ username }, { email }] });
      
    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the new user
    await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
```

---

## Step 7: Create UI Components

Now let's create the user interface for signing in and out.

### Sign-In/Out Button

First, a simple button that shows "Sign Out" when the user is authenticated and links to the sign-in page otherwise. This is useful for placing in a site header.

Create `components/SignInButton.tsx`.

```typescript
// components/SignInButton.tsx

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-4 py-2 rounded bg-gray-200 animate-pulse w-20 h-10"></div>
    );
  }

  if (session) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 rounded bg-red-500 text-white"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link href="/signin" className="px-4 py-2 rounded bg-blue-500 text-white">
      Sign In
    </Link>
  );
}
```

### Custom Sign-In Page

Since we specified `pages: { signIn: "/signin" }` in our `authOptions`, we need to create that page. This page will provide users with the option to sign in using their credentials or an OAuth provider like Google.

Create the file `app/signin/page.tsx`.

```typescript
// app/signin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Do not redirect automatically
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else if (result?.ok) {
      router.push(callbackUrl); // Redirect manually on success
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleCredentialsSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In with Credentials
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
```

You can now place `<SignInButton />` in a shared component like a navbar, and users will be directed to this comprehensive sign-in page when they need to authenticate.

---

## Conclusion

You have successfully implemented a full authentication system in your Next.js application using NextAuth.js and MongoDB. This setup is secure, scalable, and provides an excellent developer experience.

From here, you can explore more advanced topics:

- Adding more OAuth providers like GitHub, Facebook, etc.
- Implementing a `CredentialsProvider` for classic email/password login.
- Customizing session and JWT callbacks to add more data (like user roles) to the session object.
- Implementing Role-Based Access Control (RBAC) using middleware.

For further details, always refer to the official NextAuth.js documentation.
