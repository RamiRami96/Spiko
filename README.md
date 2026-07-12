<p align="center">
  <img src="./screen.jpeg" alt="Spiko app screenshot" width="280" />
</p>

<h1 align="center">Spiko</h1>

<p align="center">
  Find and join speaking clubs. Practice public speaking, host sessions, and connect with people who want to get better at talking out loud.
</p>

## About

Spiko is a mobile app for discovering, joining, and hosting speaking clubs. Users can browse active clubs, apply to attend as a **speaker** or **listener**, and hosts can review and manage applicants for the clubs they create. The project is a full-stack monorepo: an Expo/React Native client and a NestJS API backed by PostgreSQL.

## Features

- **Authentication** — sign up / sign in with cookie-based sessions, account deletion
- **Browse clubs** — searchable list of active speaking clubs
- **Create a club** — host a session with a name, description, location, date, and member cap
- **Club details** — view host info, current members, and club status
- **Apply to a club** — join as a `SPEAKER` or `LISTENER`; applications go through `PENDING → APPROVED / REJECTED / WAITLISTED / CANCELLED`
- **Settings** — manage account info, review/approve applicants for hosted clubs, track your own applications, sign out

## Tech Stack

**Client**
- [Expo](https://expo.dev) / React Native (`expo-router` for file-based navigation)
- TypeScript
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS for React Native)
- [TanStack Query](https://tanstack.com/query) for server state
- React Hook Form + Zod for form handling and validation

**Server**
- [NestJS](https://nestjs.com) (TypeScript)
- [Prisma ORM](https://www.prisma.io) with PostgreSQL
- `express-session` for cookie-based session auth (with a bearer-token compatibility shim for native clients)
- bcrypt for password hashing

## Architecture

```
Spiko/
├── client/                 # Expo / React Native app
│   └── src/
│       ├── app/             # expo-router routes (screens)
│       ├── pages/           # Top-level page components
│       ├── modules/         # Feature modules (sign-in, sign-up, clubs, club-detail,
│       │                     create-club, settings, start), each with its own
│       │                     components, hooks, and constants
│       └── shared/          # Cross-feature models, API services, TanStack Query
│                             hooks, and shared UI components
│
└── server/                  # NestJS API
    ├── prisma/               # Prisma schema (User, Club, Registration)
    └── src/
        ├── api/
        │   ├── auth/          # Sign up / sign in / sign out / session guard
        │   ├── clubs/          # Club CRUD, registrations
        │   └── users/          # User profile endpoints
        ├── prisma/            # Prisma service/module
        └── shared/            # Shared utils/types
```

**Data model** (Prisma): `User` hosts many `Club`s and creates many `Registration`s; a `Registration` links a `User` to a `Club` with a role (`SPEAKER` / `LISTENER`) and a status.

## Getting Started

### Prerequisites
- Node.js
- A PostgreSQL database
- [Expo Go](https://expo.dev/go) or an iOS/Android simulator

### Server

```bash
cd server
npm install
# create a .env with DATABASE_URL, DIRECT_URL, SESSION_SECRET
npx prisma migrate dev
npm run start:dev
```

### Client

```bash
cd client
npm install
npx expo start
```

Then open the app in a development build, simulator, or Expo Go.
