# 🏗️ CleanStack

> **Production-ready Next.js monorepo with Clean Architecture and Domain-Driven Design**

A comprehensive starter template implementing Clean Architecture and DDD patterns. Built with Next.js 16, TypeScript, Turborepo, Drizzle ORM, and a complete DDD toolkit. Designed for scalable enterprise applications with AI-friendly codebase architecture.

[![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-blue?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

**Built with Claude Code** | [Documentation](#-documentation) | [Features](#-features) | [Quick Start](#-quick-start)

## ✨ Features

### 🏛️ Architecture & Patterns
- **Clean Architecture** - Separation of concerns with clear layer boundaries
- **Domain-Driven Design** - Comprehensive DDD toolkit with Entities, Value Objects, Aggregates
- **Result<T> Pattern** - Type-safe error handling without exceptions
- **Option<T> Pattern** - Eliminate null/undefined with functional patterns
- **Use Cases** - Encapsulated business logic following single responsibility
- **Domain Events** - Event-driven architecture with type-safe handlers

### ⚡ Technology Stack
- **Next.js 16** - App Router, React Server Components, Server Actions
- **TypeScript 5.9** - Strict mode with comprehensive type safety
- **Turborepo** - High-performance build system for monorepos
- **Drizzle ORM** - Type-safe SQL with PostgreSQL
- **shadcn/ui** - Beautiful, accessible component system
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)
- **Vitest** - Lightning-fast unit testing
- **PNPM** - Efficient package management

### 🤖 AI-Friendly Development
- **Claude Code Integration** - Optimized for AI-assisted development
- **Comprehensive Documentation** - CLAUDE.md with full codebase context
- **.cursorrules** - AI coding guidelines and patterns
- **VS Code Configuration** - Pre-configured for optimal AI assistance
- **Helper Scripts** - Generate Value Objects, Use Cases, and more

## 📦 Project Structure

```
cleanstack/
├── apps/
│   └── nextjs/              # Main Next.js application
│       ├── app/             # App Router pages & layouts
│       ├── common/          # DI container, translations, providers
│       └── src/             # Clean Architecture layers
│           ├── adapters/    # Controllers, presenters, repositories
│           ├── application/ # Use cases & business logic
│           ├── domain/      # Entities, value objects, aggregates
│           └── infrastructure/ # Database, external APIs
├── packages/
│   ├── ddd-kit/         # DDD primitives (Entity, ValueObject, Aggregate, Result, Option)
│   ├── drizzle/         # Database schema & migrations
│   ├── ui/              # shadcn/ui components + brutalist design system
│   └── test/            # Shared test utilities
```

### Clean Architecture Layers

CleanStack follows Clean Architecture with strict dependency rules:

```
Infrastructure → Adapters → Application → Domain
     ↓              ↓           ↓
   Database    Controllers   Use Cases   Entities & Value Objects
   External    Presenters                Aggregates & Events
   APIs        Repositories
```

Dependencies flow **inward only**. The domain layer has zero external dependencies.

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 24.12.0
- PNPM 10.26.2
- Docker & Docker Compose

### Installation

```bash
# 1. Clone and install dependencies
git clone https://github.com/axelhamil/nextjs-clean-architecture-starter cleanstack
cd cleanstack
pnpm install

# 2. Setup database
cp .env.example .env
docker-compose up -d
pnpm db:push

# 3. Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

### First Steps

1. **Read CLAUDE.md** - Comprehensive guide to the architecture
2. **Check .cursorrules** - AI coding guidelines and patterns
3. **Explore @packages/ddd-kit** - Learn the DDD primitives
4. **Try helper scripts** - Generate Use Cases and Value Objects

### 🌐 Services

| Service | URL                                              |
| ------- | ------------------------------------------------ |
| Next.js | [`http://localhost:3000`](http://localhost:3000) |

## 🏗️ Development

### Available Commands

```bash
# Development
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server

# Code Quality
pnpm validate      # Full validation (type-check + lint + test)
pnpm quick-check   # Fast check (type-check + lint)
pnpm type-check    # TypeScript type checking
pnpm check         # Biome lint & format check
pnpm format        # Format code with Biome
pnpm test          # Run all tests with Vitest

# Database
pnpm db            # Start PostgreSQL container
pnpm db:push       # Push schema changes
pnpm db:generate   # Generate migrations
pnpm db:migrate    # Run migrations
pnpm db:studio     # Open Drizzle Studio

# Utilities
pnpm clean         # Clean build artifacts
pnpm ui:add        # Add shadcn/ui components
```

## 📚 Documentation

### Essential Reading

- **[CLAUDE.md](./CLAUDE.md)** - Complete architecture guide and codebase context
- **.cursorrules** - AI coding guidelines and architectural patterns
- **@packages/ddd-kit** - DDD primitives documentation

### Key Concepts

#### Result<T> Pattern
```typescript
const emailOrError = Email.create("user@example.com");
if (emailOrError.isFailure) {
  return Result.fail(emailOrError.getError());
}
const email = emailOrError.getValue();
```

#### Value Objects
```typescript
export class Email extends ValueObject<EmailProps> {
  protected validate(props: EmailProps): Result<EmailProps> {
    if (!emailRegex.test(props.value)) {
      return Result.fail("Invalid email");
    }
    return Result.ok(props);
  }
}
```

#### Use Cases
```typescript
export class CreateUserUseCase implements UseCase<CreateUserInput, User> {
  async execute(input: CreateUserInput): Promise<Result<User>> {
    // Business logic here
  }
}
```

## 🤖 AI-Assisted Development

CleanStack is optimized for AI coding assistants:

### Claude Code / Cursor
- **CLAUDE.md** provides complete codebase context
- **.cursorrules** defines architectural patterns and anti-patterns
- **Helper scripts** generate boilerplate code
- **Comprehensive comments** in DDD primitives

### Getting Started with AI
1. Open CLAUDE.md in your AI assistant
2. Ask it to read .cursorrules for coding guidelines
3. Use helper scripts: `./scripts/create-use-case.sh MyUseCase`
4. Follow Result<T> and Option<T> patterns consistently

## 📖 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-blue?logo=typescript)
![Turborepo](https://img.shields.io/badge/Turborepo-black?logo=turborepo)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-green?logo=drizzle)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind_4-cyan?logo=tailwind-css)
![Biome](https://img.shields.io/badge/Biome-purple)

## 🎯 When to Use CleanStack

Perfect for:
- **Enterprise applications** requiring maintainable architecture
- **Scalable systems** with complex business logic
- **Teams** wanting clear architectural boundaries
- **AI-assisted development** with Claude Code or Cursor
- **Long-term projects** where testability matters

Not ideal for:
- Simple CRUD apps or MVPs
- Prototypes requiring rapid iteration
- Projects with minimal business logic

## 🤝 Contributing

Contributions are welcome! Please read CLAUDE.md to understand the architecture before submitting PRs.

## 📝 License

MIT © [AxelHamil](https://github.com/axelhamil)

---

**Built with Claude Code** | Give it a ⭐ if you find it useful!