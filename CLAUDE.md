# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-ready Next.js 16 monorepo implementing Clean Architecture and Domain-Driven Design principles. Built with TypeScript, Drizzle ORM, and a lightweight dependency injection container.

**Tech Stack**: Next.js 16 (App Router) • TypeScript 5.9 • Drizzle ORM • PostgreSQL • Turborepo • PNPM Workspaces • Biome • shadcn/ui • Tailwind CSS 4

## Development Commands

### Core Development

```bash
# Start development server (runs db:generate first)
pnpm dev

# Build all packages and apps
pnpm build

# Type checking (requires db:generate to run first)
pnpm type-check

# Linting and formatting
pnpm lint           # Lint with Biome
pnpm format         # Format with Biome
pnpm check          # Check without fixing
pnpm fix            # Auto-fix issues
pnpm ci:check       # CI-friendly check
```

### Database Operations

```bash
# Start PostgreSQL container
pnpm db             # or: docker compose up -d postgres

# Schema management
pnpm db:generate    # Generate migrations from schema
pnpm db:push        # Push schema to database (dev only)
pnpm db:migrate     # Run migrations (production)
pnpm db:studio      # Open Drizzle Studio UI
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# Run tests in specific package
cd apps/nextjs && pnpm test
cd packages/ddd-kit && pnpm test
```

### Package Management

```bash
# Add shadcn/ui component
pnpm ui:add

# Clean all build artifacts and node_modules
pnpm clean
```

## Architecture

This project implements **Clean Architecture** with **Domain-Driven Design** patterns:

### Layer Structure

```
┌─────────────────────────────────────────┐
│ Domain                                  │
│ - Entities                              │
│ - Value Objects                         │
│ - Aggregates                            │
│ - Domain Events                         │
│                                         │
│ (depends on NOTHING)                    │
└─────────────────────────────────────────┘
               ▲
               │ depends on
┌─────────────────────────────────────────┐
│ Application                             │
│ - Use Cases                             │
│ - Commands / Queries                    │
│ - Application Services                  │
│ - PORTS (interfaces):                   │
│     • Repositories                      │
│     • Gateways                          │
│                                         │
│ (depends on Domain)                     │
└─────────────────────────────────────────┘
               ▲
               │ depends on
┌─────────────────────────────────────────┐
│ Interface Adapters                      │
│ - Controllers                           │
│ - Next.js Route Handlers                │
│ - DTOs / Presenters                     │
│                                         │
│ (depends on Application)                │
└─────────────────────────────────────────┘
               ▲
               │ depends on
┌─────────────────────────────────────────┐
│ Infrastructure                          │
│ - ORM (Drizzle)                         │
│ - Database                              │
│ - External APIs                         │
│ - Repository IMPLEMENTATIONS            │
│                                         │
│ (depends on Application ports)          │
└─────────────────────────────────────────┘

```

### Request Flow

```
HTTP Request → Route Handler → Controller → Use Case → Domain Logic → Repository PORT → Database
                    ↓              ↓            ↓           ↓               ↓
                Validates      Maps / Calls  Returns    Enforces        Returns
                  Input        Use Case      Result<T>  invariants      Option<T>
```

### Dependency Injection

Uses `@evyweb/ioctopus` for IoC container. Configuration in `/apps/nextjs/common/di/`:

- `container.ts`: ApplicationContainer singleton
- `types.ts`: Symbol definitions and type mappings
- `modules/`: Feature-specific DI modules

**Usage Pattern**:
```typescript
import { getInjection } from "@/common/di/container";

const useCase = getInjection("SomeUseCase"); // Type-safe retrieval
```

### DDD-Kit Package (`packages/ddd-kit`)

Provides domain-driven design primitives:

#### Core Building Blocks

- **`ValueObject<T>`**: Immutable objects defined by attributes, not identity
  - Validate via `validate()` method returning `Result<T>`
  - Create via `ValueObject.create(value)`
  - Frozen with `Object.freeze()`

- **`Entity<T>`**: Objects with unique identity (`UUID`)
  - Compare by ID via `equals()`
  - Methods: `get()`, `getProps()`, `toObject()`, `clone()`

- **`Aggregate<T>`**: Root entities managing consistency boundaries
  - Coordinate domain operations
  - Manage domain events: `addEvent()`, `markEventsForDispatch()`

- **`UUID`**: Type-safe unique identifiers
  - Auto-generates if not provided (uses `randomUUID()`)

#### Patterns & Utilities

- **`Result<T, E>`**: Explicit error handling without exceptions
  - `Result.ok(value)` for success
  - `Result.fail(error)` for failure
  - `Result.combine([...])` to combine multiple results
  - Properties: `isSuccess`, `isFailure`

- **`Option<T>`**: Rust-like Option/Maybe type
  - `Some<T>` and `None<T>` implementations
  - Methods: `map()`, `flatMap()`, `unwrap()`, `unwrapOr()`, `filter()`
  - `match()` for pattern matching

- **`DomainEvents`**: Static event bus for pub/sub
  - `subscribe(eventType, listener)`: Register handlers
  - `registerEvent(entityId, event)`: Queue events
  - `dispatch(entityId)`: Fire events for entity
  - `dispatchAll()`: Fire all queued events

- **`WatchedList<T>`**: Track additions/removals in collections
  - `getNewItems()`, `getRemovedItems()`, `hasChanges()`
  - Useful for aggregates managing child entities

#### Interfaces & Types

- **`BaseRepository<T>`**: Standard repository interface
  - `create()`, `update()`, `delete()`, `findById()`, `findAll()`
  - `findBy()`, `exists()`, `count()`
  - All methods return `Result<T>` or `Result<Option<T>>`
  - Transaction support via optional `trx` parameter

- **`UseCase<Input, Output>`**: Use case interface
  - `execute(input: Input): Promise<Result<Output>> | Result<Output>`

- **`QueryHandler<TResponse, TArgs>`**: Query handler type
  - `(...args: TArgs) => Promise<TResponse>`

#### Exception Types

- `DomainException`: Domain-specific errors with code categorization
- `HttpException`: Base for HTTP errors with specific subclasses:
  - `BadRequestException` (400), `UnauthorizedException` (401)
  - `NotFoundException` (404), `ForbiddenException` (403)
  - `ConflictException` (409), `UnprocessableEntityException` (422)
  - `TooManyRequestsException` (429)
  - `InternalServerErrorException` (500), `ServiceUnavailableException` (503)
- `InputParseError`: Input validation failures
- `DatabaseOperationError`: Database operation failures

### Database Layer (`packages/drizzle`)

- **Schema**: Define in `/packages/drizzle/src/schema/` (exported from index)
- **Migrations**: Generated in `/packages/drizzle/migrations/`
- **TransactionService**: Implements `ITransactionManagerService`
  - Handles transaction lifecycle with automatic rollback
  - Supports nested transactions via parent parameter
- **Type Safety**: Drizzle auto-generates TypeScript types
- **Transaction Type**: `Transaction` from `drizzle-orm/node-postgres`

Configuration in `drizzle.config.ts`:
```typescript
{
  schema: "./src/schema/*",
  out: "./migrations",
  dialect: "postgresql"
}
```

### Environment Configuration (`apps/nextjs/common/env.ts`)

- Uses Zod for validation
- Enforces type-safe environment variables
- Validates at startup
- Required: `DATABASE_URL` (used by Turborepo globally)

### Internationalization (`apps/nextjs/common/i18n/`)

- Uses `next-intl` for i18n support
- Translation files in `/apps/nextjs/common/translations/`
- Supported languages configured in `i18n/config.ts`

## Monorepo Structure

### Apps

- **`apps/nextjs/`**: Main Next.js 16 application
  - `src/`: Clean Architecture layers (adapters, application, domain, shared)
  - `common/`: App-level configuration (DI, env, i18n)
  - `app/`: Next.js App Router pages/layouts

### Packages

- **`packages/ddd-kit/`**: Domain-Driven Design primitives
  - **Build output**: `dist/` (compiled JS + declaration files)
  - **Exports**: `./dist/index.js` and `./dist/index.d.ts`
  - **Testing**: Vitest with shared config from `@packages/test`

- **`packages/drizzle/`**: Database schema and ORM setup
  - **Build output**: `dist/` (compiled JS + declaration files)
  - **Exports**: `./dist/index.js` and `./dist/index.d.ts`

- **`packages/ui/`**: Shared UI components (shadcn/ui)
  - **No build step**: Transpiled by Next.js directly
  - **Exports**: Components, hooks, libs, and globals.css

- **`packages/test/`**: Shared Vitest configuration
  - **Main export**: `base-vitest.config.ts`
  - **Exports**: Also provides `src/index.ts` for importing config

- **`packages/typescript-config/`**: Shared TypeScript configurations
  - `base.json`: Strict base config
  - `nextjs.json`: Next.js-specific config
  - `node.json`: Node.js-specific config
  - `react.json`: React-specific config

### Turborepo Task Dependencies

Key dependency chains defined in `turbo.json`:

- `dev` depends on `^db:generate` (schema types must be generated first)
- `type-check` depends on `^db:generate` (needs DB types)
- `build` depends on `^build` (packages before apps)
- All tasks requiring DB access use `DATABASE_URL` env var

## Code Style & Quality

- **Formatter/Linter**: Biome (replaces ESLint + Prettier)
- **Git Hooks**: Husky for pre-commit checks
- **Type Checking**: Strict TypeScript configuration
- **UI Components**: shadcn/ui with Tailwind CSS 4
- **Styling**: Tailwind CSS 4 with `tailwindcss-animate`

## Testing Strategy

- **Framework**: Vitest
- **Location**: `__TESTS__/` directories within packages
- **Coverage**: Available via `pnpm test:coverage`
- **Test Packages**: Shared config in `packages/test/`

Example test file: `/packages/ddd-kit/src/__TESTS__/valueObject.test.ts`

## Key Design Patterns

1. **Repository Pattern**: Abstract data access via `BaseRepository<T>`
2. **Result Pattern**: Explicit error handling with `Result<T, E>`
3. **Option Pattern**: Handle null/undefined with `Option<T>`
4. **Domain Events**: Pub/sub via `DomainEvents` static class
5. **Dependency Injection**: IoC container with type-safe symbols
6. **Factory Pattern**: `create()` methods on Value Objects and Entities
7. **Transaction Script**: Use cases orchestrate operations

## Important Notes

### Immutability
- Value objects are frozen via `Object.freeze()`
- Domain entities enforce immutability through private props

### Error Handling
- **Never throw exceptions in domain layer** - use `Result<T, E>`
- Repositories return `Result<Option<T>>` for single items
- Use cases return `Result<Output>`
- Combine results with `Result.combine([...])`

### Type Safety
- End-to-end TypeScript
- Zod schemas for runtime validation
- Database types auto-generated by Drizzle
- DI container provides type-safe injection

### Transaction Management
- Always use `TransactionService` for multi-step operations
- Pass `trx` parameter through repository methods
- Transactions auto-rollback on error

### Development Workflow

#### Initial Setup
1. Copy `.env.example` to `.env` and configure `DATABASE_URL`
2. Run `pnpm install` to install all dependencies
3. Run `pnpm db` to start PostgreSQL container
4. Run `pnpm db:push` to initialize database schema

#### Database Schema Changes
1. Update schema in `/packages/drizzle/src/schema/`
2. Run `pnpm db:generate` to create migration
3. Run `pnpm db:push` (dev) or `pnpm db:migrate` (prod)
4. TypeScript types are auto-generated

#### Adding New Packages
When creating new workspace packages, ensure:
- `main` and `types` in package.json point to `dist/` output
- `tsconfig.json` has correct `rootDir` (usually `./src`)
- Include `type-check` script: `"type-check": "tsc --noEmit"`
- Add to `transpilePackages` in `next.config.mjs` if needed by Next.js

### Domain Event Flow
1. Entity/Aggregate adds event via `addEvent()`
2. Event registered via `DomainEvents.registerEvent()`
3. Repository persists aggregate
4. Call `markEventsForDispatch()` on aggregate
5. `DomainEvents.dispatch(aggregateId)` fires events
6. Subscribed listeners handle events asynchronously

## Version Requirements

- **Node.js**: ≥ 24.12.0
- **PNPM**: 10.26.2 (enforced by `packageManager` field)
- **Database**: PostgreSQL (via Docker)

## Package Configuration Standards

All packages in this monorepo follow these standards:

### TypeScript Packages (ddd-kit, drizzle)
```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  }
}
```

### tsconfig.json Structure
```json
{
  "extends": "@packages/typescript-config/node.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "**/__TESTS__"]
}
```

### Dependency Versions
All packages use consistent versions:
- `zod`: `^4.2.1`
- `@types/node`: `^25.0.3`
- `vitest`: `^4.0.16`
- `typescript`: `^5.9.3`
