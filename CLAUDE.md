# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun run dev` (uses Turbopack for faster builds)
- **Build**: `bun run build`
- **Production start**: `bun start`
- **Lint**: `bun run lint`
- **Initialize database**: `bun run init-db` (runs scripts/init-database.js)

## Project Architecture

This is a Next.js 15 App Router project with TypeScript, serving as a personal developer portfolio (V-PRO Services) with an admin dashboard and course platform functionality.

### Key Architecture Components

**Authentication System**:
- NextAuth.js with MongoDB adapter for user management
- Credentials provider with username/password auth (plain text password for simplicity)
- JWT session strategy with custom callbacks for role-based access
- Custom sign-in page at `/auth/signin` redirects to `/admin` on success
- AuthProvider wraps the entire app in `app/layout.tsx`
- Role-based system: admin, instructor, student

**Database Integration**:
- MongoDB connection handled via `lib/mongodb.ts` with connection pooling
- Development/production mode handling for optimal performance
- Collections: `users`, `courses`, `enrollments`, `progress`, `payments`
- Requires `MONGODB_URI` and `NEXTAUTH_SECRET` environment variables

**Course Platform Features**:
- Course management with lessons, pricing, and enrollment tracking
- Video player integration with progress tracking
- Payment processing via Flutterwave integration
- Student progress tracking and certificate generation
- Admin dashboard for course and student management

**Layout Structure**:
- Root layout with AuthProvider and Geist fonts
- Admin section has dedicated layout (`app/admin/layout.tsx`) with sidebar navigation
- Admin routes are protected and use custom CSS variables for dark theme
- Course learning interface with video player and lesson navigation

**Component Organization**:
- `components/` - Shared components (Navbar, ProjectCard, VideoPlayer, PaymentModal)
- `components/admin/` - Admin-specific components (Sidebar, StatCard, course management)
- `app/` - Next.js App Router pages and API routes
- `lib/models/` - TypeScript interfaces for Course, Enrollment, Progress

**API Routes**:
- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/courses/` - Course CRUD operations
- `/api/enrollments/` - Student enrollment management
- `/api/payments/` - Payment processing with Flutterwave
- `/api/progress/` - Learning progress tracking
- `/api/projects` - Project management endpoints
- `/api/signup` - User registration

**Styling**:
- Tailwind CSS v4 with custom CSS variables for theming
- Admin dashboard uses dark theme with `var(--secondary-color)` and `var(--text-primary)`
- Responsive design with mobile-first approach

### Project Structure

```
app/
├── admin/           # Admin dashboard (courses, students, payments)
├── api/             # API routes (auth, courses, payments, progress)
├── auth/            # Authentication pages (signin, signup)
├── courses/         # Course pages (listing, detail, learning, payment)
├── (public pages)   # About, contact, projects, etc.
components/
├── admin/           # Admin-specific components (Sidebar, forms)
├── (shared)         # General components (VideoPlayer, PaymentModal)
lib/
├── models/          # TypeScript interfaces (Course, Enrollment, etc.)
├── mongodb.ts       # Database connection
├── auth.ts          # NextAuth configuration
├── flutterwave.ts   # Payment processing integration
├── init-db.ts       # Database initialization
├── utils.ts         # Utility functions
scripts/
└── init-database.js # Database setup script
types/               # Additional TypeScript type definitions
```

## Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth secret for JWT signing
- `FLUTTERWAVE_PUBLIC_KEY` - Flutterwave payment gateway public key
- `FLUTTERWAVE_SECRET_KEY` - Flutterwave payment gateway secret key

## Development Notes

- Uses Bun as package manager for faster development and builds
- TypeScript with strict mode enabled and comprehensive type definitions
- Path alias `@/*` maps to root directory for clean imports
- MongoDB with proper connection pooling and error handling
- Role-based authentication system (admin, instructor, student)
- Course platform with video hosting, payment processing, and progress tracking
- Flutterwave integration for African market payment processing
- Plain text password storage (portfolio use case - implement bcrypt in production)
- Admin dashboard with comprehensive course and student management
- Responsive design with mobile-first approach using Tailwind CSS v4
- Image optimization configured for both HTTP and HTTPS sources