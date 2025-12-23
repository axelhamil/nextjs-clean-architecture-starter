import type { ReactNode } from "react";

export default function InstallationPage(): ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black uppercase mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get CleanStack up and running in less than 5 minutes
        </p>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-black">
        <h2 className="text-2xl font-bold uppercase mb-4">Prerequisites</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Node.js</strong> ≥ 24.12.0
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>PNPM</strong> 10.26.2
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">→</span>
            <span>
              <strong>Docker</strong> and Docker Compose
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">Quick Start</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 1: Clone & Install
            </h3>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white overflow-x-auto">
              <code>{`git clone https://github.com/axelhamil/nextjs-clean-architecture-starter cleanstack
cd cleanstack
pnpm install`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 2: Setup Database
            </h3>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white overflow-x-auto">
              <code>{`cp .env.example .env
pnpm db
pnpm db:push`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-3">
              Step 3: Start Development
            </h3>
            <pre className="bg-black dark:bg-white text-green-400 dark:text-green-600 p-4 border-3 border-black dark:border-white overflow-x-auto">
              <code>pnpm dev</code>
            </pre>
            <p className="mt-3 text-muted-foreground">
              Visit{" "}
              <a
                href="http://localhost:3000"
                className="font-bold underline"
                target="_blank"
                rel="noreferrer"
              >
                http://localhost:3000
              </a>{" "}
              to see your app
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black uppercase mb-4">
          Available Commands
        </h2>

        <div className="border-3 border-black dark:border-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-black dark:bg-white text-white dark:text-black">
              <tr>
                <th className="text-left p-4 font-bold uppercase">Command</th>
                <th className="text-left p-4 font-bold uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm dev</td>
                <td className="p-4">Start development server</td>
              </tr>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm build</td>
                <td className="p-4">Build for production</td>
              </tr>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm validate</td>
                <td className="p-4">
                  Full validation (type-check + lint + test)
                </td>
              </tr>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm quick-check</td>
                <td className="p-4">Fast check (type-check + lint)</td>
              </tr>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm db:push</td>
                <td className="p-4">Push database schema changes</td>
              </tr>
              <tr className="border-t-3 border-black dark:border-white">
                <td className="p-4 font-mono">pnpm db:studio</td>
                <td className="p-4">Open Drizzle Studio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-black">
        <h2 className="text-2xl font-bold uppercase mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 font-bold">1.</span>
            <span>
              Read <strong>CLAUDE.md</strong> for complete architecture guide
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">2.</span>
            <span>
              Check <strong>.cursorrules</strong> for AI coding guidelines
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">3.</span>
            <span>
              Explore <strong>@packages/ddd-kit</strong> to learn DDD primitives
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold">4.</span>
            <span>
              Try helper scripts:{" "}
              <code className="bg-muted px-2 py-1">
                ./scripts/create-use-case.sh MyUseCase
              </code>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
