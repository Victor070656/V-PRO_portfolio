# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun run dev` (uses Turbopack for faster builds)
- **Build**: `bun run build` 
- **Production start**: `bun start`
- **Lint**: `bun run lint`

## Project Architecture

This is a Next.js 15 App Router project with TypeScript, serving as a personal developer portfolio (V-PRO Services) with an admin dashboard.

### Key Architecture Components

**Authentication System**:
- NextAuth.js with MongoDB adapter for single-user portfolio management
- Credentials provider with username/password auth (plain text password for simplicity)
- JWT session strategy
- Custom sign-in page at `/signin` redirects to `/admin` on success
- AuthProvider wraps the entire app in `app/layout.tsx`
- Single admin user setup for portfolio project management

**Database Integration**:
- MongoDB connection handled via `lib/mongodb.ts`
- Connection pooling with development/production mode handling
- Requires `MONGODB_URI` and `NEXTAUTH_SECRET` environment variables

**Layout Structure**:
- Root layout with AuthProvider and Geist fonts
- Admin section has dedicated layout (`app/admin/layout.tsx`) with sidebar navigation
- Admin routes are protected and use custom styling with CSS variables

**Component Organization**:
- `components/` - Shared components (Navbar, ProjectCard, etc.)
- `components/admin/` - Admin-specific components (Sidebar, StatCard, etc.)
- `app/` - Next.js App Router pages and API routes

**API Routes**:
- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/projects` - Project management endpoints
- `/api/signup` - User registration

**Styling**:
- Tailwind CSS with custom CSS variables for theming
- Admin dashboard uses dark theme with `var(--secondary-color)` and `var(--text-primary)`

### Project Structure

```
app/
├── admin/           # Admin dashboard pages
├── api/             # API routes
├── (public pages)   # About, contact, projects, etc.
components/
├── admin/           # Admin-specific components
├── (shared)         # General components
lib/
├── mongodb.ts       # Database connection
├── utils.ts         # Utility functions
```

## Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth secret for JWT signing

## Development Notes

- Uses Bun as package manager instead of npm
- Uses TypeScript with strict mode enabled
- Path alias `@/*` maps to root directory
- MongoDB collections: `users` (for authentication) - single admin user
- Admin dashboard uses sidebar navigation for project management
- Plain text password storage (portfolio use case)