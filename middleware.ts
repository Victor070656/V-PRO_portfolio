import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Don't interfere with NextAuth's own API routes
    if (req.nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // Check if accessing admin routes (but not the signin page itself)
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/signin")) {
      const token = req.nextauth.token;

      // Check if user is authenticated and has admin role
      if (!token || token.role !== "admin") {
        // Redirect to admin sign in page if not authenticated or not admin
        const signInUrl = new URL("/admin/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Don't block access to sign-in page or public pages
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Match admin routes
    "/admin/:path*",
    // Match admin API routes (but not NextAuth's own routes)
    "/api/admin/:path*",
  ],
};