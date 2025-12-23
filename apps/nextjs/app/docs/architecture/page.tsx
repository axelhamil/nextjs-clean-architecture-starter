import type { ReactNode } from "react";

export default function ArchitecturePage(): ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black uppercase mb-4">Architecture</h1>
        <p className="text-xl text-muted-foreground">
          Understanding Clean Architecture and Domain-Driven Design in
          CleanStack
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">Overview</h2>
        <p className="mb-4">
          CleanStack follows <strong>Clean Architecture principles</strong>{" "}
          combined with <strong>Domain-Driven Design (DDD)</strong> patterns.
          This approach ensures:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Separation of concerns</strong> - Each layer has a single
              responsibility
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Testability</strong> - Business logic independent of
              frameworks
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Maintainability</strong> - Clear boundaries and
              dependencies
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Scalability</strong> - Easy to extend and modify
            </span>
          </li>
        </ul>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-black dark:bg-white">
        <h2 className="text-2xl font-black uppercase mb-4 text-white dark:text-black">
          Layer Structure
        </h2>
        <pre className="text-green-400 dark:text-green-600 font-mono text-sm">
          {`┌─ DEPENDENCY FLOW ──────────────────────────┐
│                                            │
│   Infrastructure → Adapters → Application │
│         ↓             ↓           ↓        │
│     Database    Controllers   Use Cases    │
│     External    Presenters                 │
│     APIs        Repositories    ↓          │
│                                            │
│                            Domain          │
│                         (Core Logic)       │
│                                            │
└────────────────────────────────────────────┘`}
        </pre>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-6">The Layers</h2>

        <div className="space-y-6">
          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">
              1. Domain Layer (Core)
            </h3>
            <p className="mb-3">
              The heart of the application. Contains pure business logic with{" "}
              <strong>zero external dependencies</strong>.
            </p>
            <div className="bg-muted p-4 font-mono text-sm">
              <div>
                <strong>Location:</strong> apps/nextjs/src/domain/
              </div>
              <div className="mt-2">
                <strong>Contains:</strong>
              </div>
              <ul className="ml-4 mt-1">
                <li>→ Entities</li>
                <li>→ Value Objects</li>
                <li>→ Aggregates</li>
                <li>→ Domain Events</li>
              </ul>
            </div>
            <pre className="mt-4 bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 text-sm overflow-x-auto">
              <code>{`export class Email extends ValueObject<EmailProps> {
  protected validate(props: EmailProps): Result<EmailProps> {
    if (!emailRegex.test(props.value)) {
      return Result.fail("Invalid email");
    }
    return Result.ok(props);
  }
}`}</code>
            </pre>
          </div>

          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">
              2. Application Layer
            </h3>
            <p className="mb-3">
              Orchestrates the flow of data. Contains <strong>Use Cases</strong>{" "}
              that implement business workflows.
            </p>
            <div className="bg-muted p-4 font-mono text-sm">
              <div>
                <strong>Location:</strong> apps/nextjs/src/application/
              </div>
              <div className="mt-2">
                <strong>Contains:</strong>
              </div>
              <ul className="ml-4 mt-1">
                <li>→ Use Cases</li>
                <li>→ DTOs (Data Transfer Objects)</li>
                <li>→ Application Services</li>
              </ul>
            </div>
            <pre className="mt-4 bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 text-sm overflow-x-auto">
              <code>{`export class CreateUserUseCase {
  async execute(input: CreateUserInput): Promise<Result<User>> {
    const emailOrError = Email.create(input.email);
    if (emailOrError.isFailure) {
      return Result.fail(emailOrError.getError());
    }

    const user = User.create({ email: emailOrError.getValue() });
    await this.userRepo.save(user);

    return Result.ok(user);
  }
}`}</code>
            </pre>
          </div>

          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">
              3. Adapters Layer
            </h3>
            <p className="mb-3">
              Converts data between external formats and domain models.
            </p>
            <div className="bg-muted p-4 font-mono text-sm">
              <div>
                <strong>Location:</strong> apps/nextjs/src/adapters/
              </div>
              <div className="mt-2">
                <strong>Contains:</strong>
              </div>
              <ul className="ml-4 mt-1">
                <li>→ Controllers (Route Handlers)</li>
                <li>→ Presenters (Response formatters)</li>
                <li>→ Repository implementations</li>
              </ul>
            </div>
          </div>

          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">
              4. Infrastructure Layer
            </h3>
            <p className="mb-3">
              Manages external dependencies and technical implementations.
            </p>
            <div className="bg-muted p-4 font-mono text-sm">
              <div>
                <strong>Location:</strong> apps/nextjs/src/infrastructure/
              </div>
              <div className="mt-2">
                <strong>Contains:</strong>
              </div>
              <ul className="ml-4 mt-1">
                <li>→ Database connections</li>
                <li>→ External API clients</li>
                <li>→ File system operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">Core Patterns</h2>

        <div className="space-y-4">
          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">Result Pattern</h3>
            <p className="mb-3">
              Type-safe error handling without exceptions. Forces explicit error
              handling.
            </p>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 text-sm overflow-x-auto">
              <code>{`const result = Email.create("invalid");
if (result.isFailure) {
  console.error(result.getError()); // Handle error
  return;
}
const email = result.getValue(); // Safe to use`}</code>
            </pre>
          </div>

          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">Option Pattern</h3>
            <p className="mb-3">
              Eliminates null/undefined with functional patterns. No more null
              pointer exceptions.
            </p>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 text-sm overflow-x-auto">
              <code>{`const userOption = Option.of(await findUser(id));
userOption
  .map(user => user.email)
  .getOrElse("no-email@example.com");`}</code>
            </pre>
          </div>

          <div className="border-3 border-black dark:border-white p-6">
            <h3 className="text-xl font-bold uppercase mb-3">Domain Events</h3>
            <p className="mb-3">
              Decouple side effects from business logic. Enable event-driven
              architecture.
            </p>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 text-sm overflow-x-auto">
              <code>{`class UserCreatedEvent implements DomainEvent {
  constructor(public readonly userId: string) {}
}

// In aggregate
this.addEvent(new UserCreatedEvent(this.id.value));`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-black">
        <h2 className="text-2xl font-bold uppercase mb-4">Key Principles</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 font-bold">1.</span>
            <span>
              <strong>Dependency Rule:</strong> Dependencies only point inward.
              Inner layers know nothing about outer layers.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">2.</span>
            <span>
              <strong>Domain Independence:</strong> Business logic has zero
              framework dependencies.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">3.</span>
            <span>
              <strong>Explicit over Implicit:</strong> Use Result&lt;T&gt;
              instead of exceptions, interfaces instead of concrete types.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">4.</span>
            <span>
              <strong>Single Responsibility:</strong> Each class, function, and
              module does one thing well.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
