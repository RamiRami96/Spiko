<div align="center">

<img src="./screen.jpeg" alt="Angama app screenshot" width="280" />

# 🗣️ äñgämä - Speaking Clubs Platform

*Find and join speaking clubs. Practice public speaking, host sessions, and connect with people who want to get better at talking out loud.*

[![Expo](https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.2-38B2AC?style=for-the-badge&logo=tailwind-css)](https://www.nativewind.dev/)

</div>

> **🚧 Development Status**: This project is currently in active development. New features and improvements are being added regularly.

## ✨ Features

### 🔐 **Secure Authentication**
- Cookie-based session authentication
- Account deletion support
- Bearer-token compatibility shim for native clients

### 🏛️ **Browse Speaking Clubs**
- Searchable list of active clubs
- View host info, current members, and club status
- Real-time club discovery

### 🎤 **Create & Host Clubs**
- Host a session with name, description, location, date, and member cap
- Manage and review applicants for clubs you host

### 📝 **Apply to Clubs**
- Join as a `SPEAKER` or `LISTENER`
- Applications flow through `PENDING → APPROVED / REJECTED / WAITLISTED / CANCELLED`

### ⚙️ **Settings**
- Manage account info
- Review and approve applicants for hosted clubs
- Track your own applications
- Sign out

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Expo / React Native** | Cross-platform mobile app (`expo-router` for navigation) | 54 / 0.81 |
| **TypeScript** | Type-safe development | 5.9 |
| **NativeWind** | Tailwind CSS for React Native | 4.2 |
| **TanStack Query** | Server state management | 5.101 |
| **React Hook Form + Zod** | Form handling and validation | - |
| **NestJS** | Full-stack API framework | 11 |
| **Prisma ORM** | Type-safe database access | 6.19 |
| **PostgreSQL** | Primary database | - |
| **express-session + bcrypt** | Session auth & password hashing | - |

## 📁 Project Structure

```
Angama/
├── client/                  # Expo / React Native app
│   └── src/
│       ├── app/              # expo-router routes (screens)
│       ├── pages/             # Top-level page components
│       ├── modules/           # Feature modules (sign-in, sign-up, clubs,
│       │                        club-detail, create-club, settings, start)
│       └── shared/            # Cross-feature models, API services,
│                                TanStack Query hooks, shared UI components
│
└── server/                  # NestJS API
    ├── prisma/                # Prisma schema (User, Club, Registration)
    └── src/
        ├── api/
        │   ├── auth/            # Sign up / sign in / sign out / session guard
        │   ├── clubs/           # Club CRUD, registrations
        │   └── users/           # User profile endpoints
        ├── prisma/               # Prisma service/module
        └── shared/                # Shared utils/types
```

**Data model** (Prisma): `User` hosts many `Club`s and creates many `Registration`s; a `Registration` links a `User` to a `Club` with a role (`SPEAKER` / `LISTENER`) and a status.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- A PostgreSQL database
- [Expo Go](https://expo.dev/go) or an iOS/Android simulator

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Angama
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup
Create a `.env` file in the `server/` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/angama"
DIRECT_URL="postgresql://username:password@localhost:5432/angama"
SESSION_SECRET="your-secret-key"
```

### 4. Database Setup
```bash
cd server
npx prisma migrate dev
```

### 5. Run the Application
```bash
# Terminal 1: Start the NestJS API
cd server
npm run start:dev

# Terminal 2: Start the Expo app
cd client
npx expo start
```

Open the app in a development build, simulator, or Expo Go.

## 🎯 Usage

### Creating an Account
1. Sign up with your details
2. Sign in using cookie-based sessions

### Finding a Club
1. Browse the searchable list of active speaking clubs
2. Open a club to see host info, members, and status
3. Apply as a `SPEAKER` or `LISTENER`

### Hosting a Club
1. Create a club with a name, description, location, date, and member cap
2. Review incoming applications from the Settings screen
3. Approve, reject, or waitlist applicants

## 🎯 Future Plans

### 📱 **Platform Growth**
- Push notifications for club invites and application updates
- In-app messaging between hosts and members
