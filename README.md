# 🚀 Full-Stack Next.js Monorepo Boilerplate

> A production-ready, full-stack monorepo boilerplate featuring Next.js, Drizzle ORM, and a modern TypeScript stack. It's designed to be a starting point for your own applications, with a focus on Developer Experience and best practices.

## ✨ Features

- **Monorepo Structure** powered by Turborepo and PNPM Workspaces
- **Full-Stack Next.js 15** with App Router, Server Components, and Route Handlers
- **Type Safety** across all packages and apps with shared TypeScript configurations
- **Modern Development Tools** including Biome for linting and formatting
- **Containerized Development** with Docker and Docker Compose
- **Modern Styling** with Tailwind CSS 4 and shadcn/ui
- **Type-Safe Database** with Drizzle ORM and PostgreSQL
- **Dependency Injection** with a lightweight container

## 📦 Project Structure

```
.
├── apps/
│   └── nextjs/       # Full-Stack Next.js Application
├── packages/
│   ├── drizzle/      # Database schema and migrations
│   ├── libs/         # Shared utilities and types
│   ├── ui/           # Shared UI components from shadcn/ui
│   └── typescript-config/ # Shared TypeScript configurations
```

## 🛠️ Prerequisites

- Node.js (version 22.16.0 or later)
- PNPM package manager (10.12.1 or later)
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

### Main Stack

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square)
![Zod](https://img.shields.io/badge/Zod_3-3068B7?style=flat-square)
![Nuqs](https://img.shields.io/badge/Nuqs_2-4353FF?style=flat-square)

### ⚡ Development

![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=flat-square&logo=turborepo)
![PNPM](https://img.shields.io/badge/PNPM_10-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-42B983?style=flat-square&logo=git&logoColor=white)

### 🔄 Utilities

![Remeda](https://img.shields.io/badge/Remeda-2C5BB4?style=flat-square)
![Slugify](https://img.shields.io/badge/Slugify-4C4A73?style=flat-square)

## 📝 License

MIT

Created by [@axelhamil](https://github.com/axelhamil)