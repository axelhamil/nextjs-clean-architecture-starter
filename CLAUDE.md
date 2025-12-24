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

This project implements **Clean Architecture** with **Domain-Driven Design** patterns.

### Core Principle: Dependency Rule

**All dependencies point INWARD toward the Domain**. The Domain is the core and has ZERO dependencies on outer layers.

### Layer Structure

```
┌─────────────────────────────────────────┐
│ Domain (Core)                           │
│ - Entities                              │
│ - Value Objects                         │
│ - Aggregates                            │
│ - Domain Events                         │
│                                         │
│ DEPENDS ON: NOTHING                     │
└─────────────────────────────────────────┘
               ▲
               │
               │ depends on
               │
┌─────────────────────────────────────────┐
│ Application                             │
│ - Use Cases                             │
│ - Commands / Queries                    │
│ - Application Services                  │
│ - PORTS (interfaces):                   │
│     • Repository interfaces             │
│     • Gateway interfaces                │
│                                         │
│ DEPENDS ON: Domain only                 │
└─────────────────────────────────────────┘
               ▲
               │
               │ depends on
               │
┌─────────────────────────────────────────┐
│ Interface Adapters                      │
│ - Controllers                           │
│ - Next.js Route Handlers                │
│ - DTOs / Presenters                     │
│ - Input validation (Zod)                │
│                                         │
│ DEPENDS ON: Application + Domain        │
└─────────────────────────────────────────┘
               ▲
               │
               │ depends on
               │
┌─────────────────────────────────────────┐
│ Infrastructure (Outermost)              │
│ - ORM (Drizzle)                         │
│ - Database                              │
│ - External APIs                         │
│ - Repository IMPLEMENTATIONS            │
│ - DI Container configuration            │
│                                         │
│ DEPENDS ON: Application ports           │
└─────────────────────────────────────────┘
```

### Request Flow

```
HTTP Request
    ↓
Route Handler (adapters/in/api/)
    ↓
Controller validates input & maps to DTO
    ↓
Use Case (application/) - orchestrates business logic
    ↓
Domain Logic (domain/) - enforces business rules
    ↓
Repository PORT (application/ports/) - interface
    ↓
Repository IMPL (adapters/out/) - concrete implementation
    ↓
Database

Return path: Database → Option<T> → Result<T> → DTO → JSON Response
```

## AI Development Guidelines

This section provides explicit patterns and rules for AI assistants working in this codebase. Following these guidelines ensures code quality and architectural consistency.

### Mandatory Architectural Rules

#### 1. Respect the Dependency Rule (CRITICAL)

**NEVER violate the dependency direction**:

- Domain MUST NOT import from Application, Adapters, or Infrastructure
- Application MUST NOT import from Adapters or Infrastructure
- Adapters MUST NOT import from Infrastructure
- Infrastructure CAN import from Application (via ports/interfaces)

**Example violations to AVOID**:
```typescript
// WRONG: Domain importing from Application
import { SomeUseCase } from '@/application/...'  // in domain layer

// WRONG: Application importing Infrastructure
import { DrizzleUserRepository } from '@/adapters/out/...'  // in application layer

// WRONG: Domain importing external libraries (except DDD-kit)
import { db } from '@packages/drizzle'  // in domain layer
```

**Correct patterns**:
```typescript
// Domain: only imports from ddd-kit
import { Entity, Result, UUID } from '@packages/ddd-kit'

// Application: imports Domain + defines ports
import { User } from '@/domain/...'
import type { IUserRepository } from '@/application/ports/...'

// Infrastructure: imports Application ports, implements them
import type { IUserRepository } from '@/application/ports/...'
export class DrizzleUserRepository implements IUserRepository { }
```

#### 2. Error Handling Pattern (MANDATORY)

**NEVER throw exceptions** in Domain or Application layers. Use `Result<T, E>` pattern.

```typescript
// WRONG
async execute(input: CreateUserInput): Promise<User> {
  if (!input.email) {
    throw new Error('Email is required')  // ❌ NEVER throw
  }
  const user = await this.repo.create(...)
  return user
}

// CORRECT
async execute(input: CreateUserInput): Promise<Result<User>> {
  const emailOrError = Email.create(input.email)
  if (emailOrError.isFailure) {
    return Result.fail(emailOrError.error)  // ✅ Return Result
  }

  const userOrError = await this.repo.create(...)
  if (userOrError.isFailure) {
    return Result.fail(userOrError.error)
  }

  return Result.ok(userOrError.value)
}
```

**Repository pattern** - always return `Result<Option<T>>` for single items:
```typescript
async findById(id: UUID): Promise<Result<Option<User>>> {
  try {
    const row = await db.select().where(eq(users.id, id.value))
    if (!row) return Result.ok(None())  // ✅ None, not null
    return Result.ok(Some(User.create(row)))
  } catch (error) {
    return Result.fail(new DatabaseOperationError(...))  // ✅ Never throw
  }
}
```

#### 3. Immutability Pattern (MANDATORY)

**All Domain objects MUST be immutable**:

```typescript
// Value Objects: use Object.freeze()
export class Email extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props)
    Object.freeze(this)  // ✅ REQUIRED
  }

  static create(email: string): Result<Email> {
    // validation logic
    return Result.ok(new Email({ value: email }))
  }

  // ❌ NEVER add setters
  // setValue(v: string) { this.props.value = v }  // WRONG
}

// Entities: private props, no setters
export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UUID) {
    super(props, id)
  }

  // ✅ Return new instance for updates
  updateEmail(email: Email): Result<User> {
    const newProps = { ...this.props, email }
    return Result.ok(new User(newProps, this.id))
  }

  // ❌ NEVER mutate
  // setEmail(email: Email) { this.props.email = email }  // WRONG
}
```

#### 4. Use Cases Pattern (MANDATORY)

Every Use Case MUST:
- Implement `UseCase<Input, Output>` interface
- Return `Result<Output>`
- Be registered in DI container
- Have a single responsibility

```typescript
// ✅ CORRECT structure
import { UseCase } from '@packages/ddd-kit'
import type { IUserRepository } from '@/application/ports/IUserRepository'

interface CreateUserInput {
  email: string
  name: string
}

export class CreateUserUseCase implements UseCase<CreateUserInput, User> {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<Result<User>> {
    // 1. Validate input & create Value Objects
    const emailOrError = Email.create(input.email)
    if (emailOrError.isFailure) return Result.fail(emailOrError.error)

    // 2. Create Domain Entity
    const userOrError = User.create({
      email: emailOrError.value,
      name: input.name,
    })
    if (userOrError.isFailure) return Result.fail(userOrError.error)

    // 3. Persist via Repository
    const savedOrError = await this.userRepo.create(userOrError.value)
    if (savedOrError.isFailure) return Result.fail(savedOrError.error)

    // 4. Return Result
    return Result.ok(savedOrError.value)
  }
}
```

#### 5. Repository Pattern (MANDATORY)

Repositories MUST:
- Be interfaces (ports) in Application layer
- Be implemented in Infrastructure layer
- Extend `BaseRepository<T>` from ddd-kit
- Use `Option<T>` for single items
- Support transactions via `trx` parameter

```typescript
// Application layer: application/ports/IUserRepository.ts
import type { BaseRepository } from '@packages/ddd-kit'
import type { User } from '@/domain/user/User'

export interface IUserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<Result<Option<User>>>
}

// Infrastructure layer: adapters/out/persistence/DrizzleUserRepository.ts
import type { IUserRepository } from '@/application/ports/IUserRepository'
import type { Transaction } from 'drizzle-orm/node-postgres'
import { db } from '@packages/drizzle'

export class DrizzleUserRepository implements IUserRepository {
  async findById(
    id: UUID,
    trx?: Transaction  // ✅ Always support transactions
  ): Promise<Result<Option<User>>> {
    const database = trx ?? db
    try {
      const row = await database.query.users.findFirst({
        where: eq(users.id, id.value)
      })
      if (!row) return Result.ok(None())  // ✅ Use Option, not null

      const userOrError = UserMapper.toDomain(row)
      if (userOrError.isFailure) return Result.fail(userOrError.error)

      return Result.ok(Some(userOrError.value))
    } catch (error) {
      return Result.fail(new DatabaseOperationError('Failed to find user'))
    }
  }

  // Implement all BaseRepository methods...
}
```

#### 6. Transaction Pattern (MANDATORY for multi-step operations)

**Transaction management happens at the Controller/Route Handler level**, not in UseCases. This allows composing multiple UseCases in a single transaction.

**Key Points:**
- Controller retrieves `TransactionManager` via `getInjection`
- Controller manages transaction lifecycle
- UseCases receive optional `trx?: Transaction` parameter
- This enables chaining multiple UseCases in one transaction

✅ **CORRECT - Transaction managed in Controller:**

```typescript
// Route Handler / Controller
import { getInjection } from '@/common/di/container'
import type { Transaction } from 'drizzle-orm/node-postgres'

export async function POST(request: Request) {
  const txManager = getInjection('ITransactionManagerService')
  const createUserUseCase = getInjection('CreateUserUseCase')
  const sendWelcomeEmailUseCase = getInjection('SendWelcomeEmailUseCase')

  const body = await request.json()

  // Controller manages the transaction
  const result = await txManager.execute(async (trx) => {
    // Execute multiple UseCases in same transaction
    const userResult = await createUserUseCase.execute(body, trx)
    if (userResult.isFailure) return Result.fail(userResult.error)

    const emailResult = await sendWelcomeEmailUseCase.execute(
      { userId: userResult.value.id },
      trx
    )
    if (emailResult.isFailure) return Result.fail(emailResult.error)

    return Result.ok(userResult.value)
  })
  // Transaction auto-commits on success, auto-rolls back on failure

  if (result.isFailure) {
    return Response.json({ error: result.error }, { status: 400 })
  }

  return Response.json(result.value)
}
```

✅ **CORRECT - UseCase accepts optional transaction:**

```typescript
// Use Case
import type { Transaction } from 'drizzle-orm/node-postgres'

export class CreateUserUseCase implements UseCase<CreateUserInput, User> {
  constructor(
    private readonly userRepo: IUserRepository
  ) {}

  // Transaction is passed as optional parameter
  async execute(
    input: CreateUserInput,
    trx?: Transaction
  ): Promise<Result<User>> {
    const emailOrError = Email.create(input.email)
    if (emailOrError.isFailure) return Result.fail(emailOrError.error)

    const userOrError = User.create({
      email: emailOrError.value,
      name: input.name,
    })
    if (userOrError.isFailure) return Result.fail(userOrError.error)

    // Pass transaction to repository
    const savedOrError = await this.userRepo.create(userOrError.value, trx)
    if (savedOrError.isFailure) return Result.fail(savedOrError.error)

    return Result.ok(savedOrError.value)
  }
}
```

**Why this pattern?**
- ✅ Compose multiple UseCases in one transaction
- ✅ Controller has control over transaction boundaries
- ✅ UseCases remain focused on business logic
- ✅ Easy to test UseCases with or without transactions

#### 7. Domain Events Pattern

When using Domain Events:

```typescript
// 1. Define event in Domain layer
export class UserCreatedEvent {
  constructor(
    public readonly userId: UUID,
    public readonly email: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}

// 2. Add event to Aggregate
export class User extends Aggregate<UserProps> {
  static create(props: CreateUserProps): Result<User> {
    const user = new User(props)
    user.addEvent(new UserCreatedEvent(user.id, user.email.value))  // ✅
    return Result.ok(user)
  }
}

// 3. Dispatch after persistence
const userOrError = await this.userRepo.create(user)
if (userOrError.isSuccess) {
  user.markEventsForDispatch()
  DomainEvents.dispatch(user.id)  // Fire events asynchronously
}
```

#### 8. Dependency Injection Pattern (MANDATORY)

All dependencies MUST be injected via the DI container:

```typescript
// ❌ WRONG: Direct instantiation
const repo = new DrizzleUserRepository()
const useCase = new CreateUserUseCase(repo)

// ✅ CORRECT: DI Container
// 1. Register in DI module (common/di/modules/user.module.ts)
import { ApplicationContainer } from '@evyweb/ioctopus'

export const userModule = (container: ApplicationContainer) => {
  container.bind('IUserRepository').toClass(DrizzleUserRepository)
  container.bind('CreateUserUseCase').toClass(CreateUserUseCase)
}

// 2. Use in controllers/route handlers
import { getInjection } from '@/common/di/container'

const useCase = getInjection('CreateUserUseCase')  // ✅ Type-safe
```

### Code Organization Rules

#### File Structure Convention

```
apps/nextjs/src/
├── domain/                        # Core business logic
│   └── user/
│       ├── User.ts                # Entity/Aggregate
│       ├── Email.ts               # Value Object
│       └── events/
│           └── UserCreatedEvent.ts
├── application/                   # Use cases & ports
│   ├── use-cases/
│   │   └── CreateUserUseCase.ts
│   └── ports/                     # Interfaces only
│       └── IUserRepository.ts
├── adapters/
│   ├── in/                        # Input adapters
│   │   └── api/
│   │       └── users/
│   │           └── route.ts       # Next.js route handler
│   └── out/                       # Output adapters
│       └── persistence/
│           ├── DrizzleUserRepository.ts
│           └── mappers/
│               └── UserMapper.ts  # Domain ↔ DB mapping
└── shared/                        # Shared utilities
    └── errors/
```

#### Naming Conventions

- **Entities**: PascalCase, singular (e.g., `User`, `Order`)
- **Value Objects**: PascalCase, descriptive (e.g., `Email`, `Money`, `Address`)
- **Use Cases**: PascalCase + `UseCase` suffix (e.g., `CreateUserUseCase`)
- **Repositories**: `I` prefix for interface, implementation name describes tech (e.g., `IUserRepository` → `DrizzleUserRepository`)
- **DTOs**: PascalCase + `Dto` suffix (e.g., `CreateUserDto`)
- **Events**: PascalCase + `Event` suffix, past tense (e.g., `UserCreatedEvent`)

### Testing Patterns

#### Unit Tests for Domain

```typescript
// Domain objects should be tested in isolation
describe('Email Value Object', () => {
  it('should create valid email', () => {
    const result = Email.create('test@example.com')
    expect(result.isSuccess).toBe(true)
  })

  it('should reject invalid email format', () => {
    const result = Email.create('invalid')
    expect(result.isFailure).toBe(true)
  })
})
```

#### Integration Tests for Use Cases

```typescript
// Use Cases tested with real or mock repositories
describe('CreateUserUseCase', () => {
  it('should create user successfully', async () => {
    const mockRepo = createMockRepository()
    const useCase = new CreateUserUseCase(mockRepo)

    const result = await useCase.execute({
      email: 'test@example.com',
      name: 'Test User'
    })

    expect(result.isSuccess).toBe(true)
  })
})
```

### Common Anti-Patterns to AVOID

#### ❌ Anemic Domain Model
```typescript
// WRONG: No business logic, just getters/setters
class User {
  constructor(public email: string, public name: string) {}
  setEmail(e: string) { this.email = e }
}
```

#### ❌ Fat Controllers
```typescript
// WRONG: Business logic in controller
export async function POST(request: Request) {
  const body = await request.json()
  // ❌ Validation, business rules, persistence all in controller
  if (!body.email.includes('@')) return Response.json({ error: 'Invalid' })
  const user = { id: crypto.randomUUID(), ...body }
  await db.insert(users).values(user)
}
```

#### ❌ Direct Database Access from Domain
```typescript
// WRONG: Domain importing database
import { db } from '@packages/drizzle'  // ❌ in domain layer

class User extends Entity<UserProps> {
  async save() {
    await db.insert(users).values(this.toObject())  // ❌❌❌
  }
}
```

#### ❌ Null/Undefined instead of Option
```typescript
// WRONG
async findById(id: UUID): Promise<User | null> {  // ❌
  return await db.query.users.findFirst(...) ?? null
}

// CORRECT
async findById(id: UUID): Promise<Result<Option<User>>> {  // ✅
  const row = await db.query.users.findFirst(...)
  if (!row) return Result.ok(None())
  return Result.ok(Some(UserMapper.toDomain(row)))
}
```

### Quick Reference Checklist

When implementing a new feature, ask yourself:

- [ ] Does my Domain layer have ZERO imports from outer layers?
- [ ] Am I using `Result<T>` instead of throwing exceptions?
- [ ] Are my Value Objects and Entities immutable?
- [ ] Did I define repository interfaces in Application layer?
- [ ] Are repository implementations in Infrastructure layer?
- [ ] Am I using `Option<T>` instead of null/undefined?
- [ ] Is my Use Case registered in the DI container?
- [ ] Do multi-step operations use `TransactionService`?
- [ ] Are my Domain Events dispatched AFTER persistence?
- [ ] Did I write tests for my Domain logic?

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
