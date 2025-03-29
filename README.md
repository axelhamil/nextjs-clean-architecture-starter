# 🚀 Modern TypeScript Monorepo Boilerplate

> A production-ready monorepo boilerplate using modern TypeScript stack with a focus on Developer Experience and best practices.

## ✨ Features

### 🏗️ Architecture

- **Monorepo Structure** powered by Turborepo and PNPM Workspaces
- **Type Safety** across all packages and apps with shared TypeScript configurations
- **Modern Development Tools** including Biome for linting and formatting
- **Containerized Development** with Docker and Docker Compose

### 🛠️ Frontend Stack

- **Multiple Frontend Apps**:
  - **Next.js 15** app with App Router and Server Components
  - **React 19** app with Vite for lighter applications
- **Modern Styling**:
  - **Tailwind CSS 4** with animations
- **Type-Safe State Management** with `nuqs` for URL state and Zustand

### ⚙️ Backend & Infrastructure

- **Fastify 5** for high-performance API with TypeScript
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** database with Docker setup
- **Dependency Injection** with InversifyJS

## 📦 Project Structure

```
.
├── apps/
│   ├── api/          # Fastify Backend API
│   ├── nextjs/       # Next.js Frontend Application
│   └── reactjs/      # React + Vite Frontend Application
├── packages/
│   ├── drizzle/      # Database schema and migrations
│   ├── libs/         # Shared utilities and types
│   └── typescript-config/ # Shared TypeScript configurations
```

## 🛠️ Prerequisites

- Node.js (version 22.14.0 or later)
- PNPM package manager (10.6.3 or later)
- Docker and Docker Compose
- PostgreSQL (via Docker)

## 🚀 Getting Started

```shell
# Clone and install
git clone <repository-url> && cd <repository-name>
pnpm install

# Setup environment and database
cp .env.example .env
docker-compose up -d
pnpm db:push

# Start development
pnpm dev
```

### 🌐 Services

| Service | URL                                              |
| ------- | ------------------------------------------------ |
| Next.js | [`http://localhost:3000`](http://localhost:3000) |
| React   | [`http://localhost:5173`](http://localhost:5173) |
| API     | [`http://localhost:8080`](http://localhost:8080) |

## 🏗️ Development

### Available Scripts

```shell
pnpm dev        # Start all applications in development mode
pnpm build      # Build all applications and packages
pnpm lint       # Lint all applications and packages using Biome
pnpm format     # Format code using Biome
pnpm db:push    # Push database schema changes
pnpm db:generate # Generate database types and migrations
pnpm db:migrate # Run database migrations
pnpm db:studio  # Open Drizzle Studio
pnpm clean      # Clean up build artifacts and node_modules
pnpm type-check # Run TypeScript type checking
pnpm test       # Run tests
```

## 📚 Tech Stack

### 🎨 Frontend

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_5-624DE3?style=flat-square)
![Nuqs](https://img.shields.io/badge/Nuqs_2-4353FF?style=flat-square)
![TanStack Query](https://img.shields.io/badge/TanStack_Query_5-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)

### 🔧 Backend

![Fastify](https://img.shields.io/badge/Fastify_5-202020?style=flat-square&logo=fastify)
![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logoColor=black)
![InversifyJS](https://img.shields.io/badge/InversifyJS_6-1F0954?style=flat-square)
![Zod](https://img.shields.io/badge/Zod_3-3068B7?style=flat-square)

### ⚡ Development

![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=flat-square&logo=turborepo)
![PNPM](https://img.shields.io/badge/PNPM_10-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-42B983?style=flat-square&logo=git&logoColor=white)

### 🔄 Utilities

![date-fns](https://img.shields.io/badge/date--fns_4-770C56?style=flat-square)
![decimal.js](https://img.shields.io/badge/decimal.js-41BDF5?style=flat-square)
![Remeda](https://img.shields.io/badge/Remeda-2C5BB4?style=flat-square)
![UUID](https://img.shields.io/badge/UUID_11-338BA8?style=flat-square)
![Slugify](https://img.shields.io/badge/Slugify-4C4A73?style=flat-square)

## 📝 License

MIT
