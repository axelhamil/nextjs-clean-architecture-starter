import type { ReactNode } from "react";

export default function ClaudeCodePage(): ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black uppercase mb-4">Claude Code</h1>
        <p className="text-xl text-muted-foreground">
          Optimized for AI-assisted development with Claude Code, Cursor, and
          other AI tools
        </p>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-black">
        <h2 className="text-2xl font-bold uppercase mb-4">Why AI-Friendly?</h2>
        <p className="mb-4">
          CleanStack is designed to work seamlessly with AI coding assistants:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>CLAUDE.md</strong> - Complete codebase context in a single
              file
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>.cursorrules</strong> - Architectural rules and coding
              patterns
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Helper scripts</strong> - Generate boilerplate code
              instantly
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Rich comments</strong> - DDD primitives are
              well-documented
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">
          Quick Start with Claude Code
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 1: Read CLAUDE.md
            </h3>
            <p className="mb-3">
              Start by asking your AI assistant to read the CLAUDE.md file:
            </p>
            <div className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white">
              <p className="font-mono text-sm">
                "Read CLAUDE.md and understand the architecture"
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 2: Check .cursorrules
            </h3>
            <p className="mb-3">
              The .cursorrules file contains architectural patterns and
              anti-patterns:
            </p>
            <div className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white">
              <p className="font-mono text-sm">
                "Read .cursorrules for coding guidelines"
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 3: Use Helper Scripts
            </h3>
            <p className="mb-3">Generate boilerplate code with scripts:</p>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white overflow-x-auto">
              <code>{`# Create a new Use Case
./scripts/create-use-case.sh CreateUser

# Create a new Value Object
./scripts/create-value-object.sh Email`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">AI Commands</h2>

        <div className="space-y-4">
          <div className="border-3 border-black dark:border-white p-4">
            <h3 className="font-bold uppercase mb-2">Create a Use Case</h3>
            <div className="bg-muted p-3 font-mono text-sm">
              "Create a CreateUser use case that validates email and saves to
              repository"
            </div>
          </div>

          <div className="border-3 border-black dark:border-white p-4">
            <h3 className="font-bold uppercase mb-2">Create a Value Object</h3>
            <div className="bg-muted p-3 font-mono text-sm">
              "Create an Email value object with regex validation"
            </div>
          </div>

          <div className="border-3 border-black dark:border-white p-4">
            <h3 className="font-bold uppercase mb-2">Add Repository</h3>
            <div className="bg-muted p-3 font-mono text-sm">
              "Create a UserRepository interface in domain and implementation in
              infrastructure"
            </div>
          </div>

          <div className="border-3 border-black dark:border-white p-4">
            <h3 className="font-bold uppercase mb-2">Validate Architecture</h3>
            <div className="bg-muted p-3 font-mono text-sm">
              "Check if my code follows Clean Architecture principles"
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">Best Practices</h2>

        <div className="border-3 border-black dark:border-white p-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 font-bold">1.</span>
              <span>
                <strong>Always start with CLAUDE.md</strong> - Let AI understand
                the full context
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">2.</span>
              <span>
                <strong>Reference .cursorrules</strong> - Remind AI of
                architectural rules
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">3.</span>
              <span>
                <strong>Use Result&lt;T&gt; pattern</strong> - No exceptions in
                domain layer
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">4.</span>
              <span>
                <strong>Follow layer boundaries</strong> - Domain is
                framework-independent
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">5.</span>
              <span>
                <strong>Validate often</strong> - Run pnpm validate after
                changes
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-black dark:bg-white">
        <h2 className="text-2xl font-bold uppercase mb-4 text-white dark:text-black">
          Key Files for AI
        </h2>
        <div className="space-y-3 text-white dark:text-black">
          <div>
            <div className="font-bold font-mono">CLAUDE.md</div>
            <div className="text-sm">Complete architecture documentation</div>
          </div>
          <div>
            <div className="font-bold font-mono">.cursorrules</div>
            <div className="text-sm">
              Coding rules and architectural patterns
            </div>
          </div>
          <div>
            <div className="font-bold font-mono">packages/ddd-kit/</div>
            <div className="text-sm">
              DDD primitives (Entity, ValueObject, Aggregate, Result, Option)
            </div>
          </div>
          <div>
            <div className="font-bold font-mono">
              apps/nextjs/src/domain/examples/
            </div>
            <div className="text-sm">Example implementations to learn from</div>
          </div>
        </div>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-black">
        <h2 className="text-2xl font-bold uppercase mb-4">Common Prompts</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Generate Complete Feature</h3>
            <div className="bg-muted p-3 text-sm">
              "Create a complete user registration feature following Clean
              Architecture: Value Object for Email, Entity for User, CreateUser
              use case, and route handler"
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Add Testing</h3>
            <div className="bg-muted p-3 text-sm">
              "Write unit tests for the Email value object using Vitest"
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Refactor to DDD</h3>
            <div className="bg-muted p-3 text-sm">
              "Refactor this code to follow DDD patterns with proper value
              objects and aggregates"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
