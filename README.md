# Campus Platform

Campus Platform is a full-stack web app for managing college events. It gives students a place to discover and apply for events, and gives admins a focused dashboard to publish events, review registrations, and manage public highlights.

## What This Project Does

- Student registration with email verification
- Secure login with role-based access
- Public landing page, events listing, highlights gallery, and legal pages
- Admin-only event creation and editing
- Student event applications with duplicate prevention and deadline checks
- Registration status tracking for students
- Public highlight gallery management for admins

## Main User Flows

### Students

- Create an account and verify email
- Sign in with email and password
- Browse upcoming events
- Filter events by search and event type
- View event details such as venue, rules, date, time, and pricing
- Apply for events before the deadline
- Track registration status from the dashboard

### Admins

- Register with a protected admin invite code
- Sign in to the admin panel
- Create events with deadlines, pricing, venue, rules, and privacy notes
- Explore all published events
- Review registrations
- Approve or reject applications
- Add images to the public highlights gallery

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth credentials authentication
- Supabase Auth for email verification
- Tailwind CSS 4
- shadcn/ui and Radix UI
- Framer Motion

## Project Structure

```text
src/
  app/
    (public)/        Public pages such as home, events, highlights, privacy policy, and terms
    (auth)/          Login and registration pages
    (app)/           Protected student and admin dashboards
    api/             Route handlers for auth, registration, events, highlights, and applications
  components/
    admin/           Admin forms and management UI
    auth/            Login and register cards
    events/          Event actions and event detail components
    landing/         Homepage sections
    layout/          Shared navbar, footer, and background UI
    ui/              Reusable UI primitives
  lib/
    auth.ts          NextAuth configuration
    prisma.ts        Prisma client setup
    supabase.ts      Supabase clients and base URL helper
prisma/
  schema.prisma      Database schema
  migrations/        Prisma migrations
```

## Database Model Overview

The app uses these main models:

- `User`: student or admin account, profile details, verification state
- `Event`: event title, description, type, deadline, pricing, creator
- `EventDetails`: extra event info such as venue, rules, date, and time
- `Application`: student registration record with status
- `HighlightGalleryItem`: public gallery image entries

## Environment Variables

Create a `.env` file in the project root and configure these values:

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_INVITE_CODE=
```

### What Each Variable Is For

- `DATABASE_URL`: PostgreSQL connection used by the app
- `DIRECT_URL`: direct database connection used by Prisma migrations
- `NEXTAUTH_SECRET`: secret for NextAuth session signing
- `NEXTAUTH_URL`: base URL used by authentication flows
- `NEXT_PUBLIC_APP_URL`: fallback app URL used for confirmation redirects
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase key for auth signup
- `SUPABASE_SERVICE_ROLE_KEY`: admin key used to verify and manage users
- `ADMIN_INVITE_CODE`: required to create admin accounts

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up the database

```bash
pnpm prisma migrate dev
```

### 3. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` - start the local development server
- `pnpm build` - create a production build
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint

## API Areas

- `/api/register` - creates student or admin accounts
- `/api/auth/[...nextauth]` - authentication handler
- `/api/events` and `/api/events/[id]` - event creation and management
- `/api/applications` - student event applications
- `/api/applications/status` - admin status updates for applications
- `/api/highlights` - highlights gallery management

## Notes

- Students cannot apply to the same event twice.
- Admins cannot register for events as participants.
- Event applications are blocked after the deadline.
- Email verification is required before sign-in is allowed.

## Future Improvements

- Payment gateway integration for paid events
- Better analytics for event participation
- Email notifications for application status changes
- File uploads for event posters and documents
- Richer admin reporting and filters

## Author

Built as a campus event management platform for handling student registrations, admin workflows, and public event discovery in one place.
