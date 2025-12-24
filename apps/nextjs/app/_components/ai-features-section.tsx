"use client";

import { motion } from "framer-motion";
import { Bot, Brain, FileCode2, Sparkles, Zap } from "lucide-react";

const aiFeatures = [
  {
    icon: Bot,
    title: "Claude Code Ready",
    description:
      "Complete CLAUDE.md with full architecture context. AI understands your codebase instantly.",
    color: "bg-blue-100 dark:bg-blue-950",
  },
  {
    icon: Brain,
    title: "Explicit Patterns",
    description:
      "Result<T>, Option<T>, and DDD patterns documented for AI comprehension. No guessing.",
    color: "bg-purple-100 dark:bg-purple-950",
  },
  {
    icon: FileCode2,
    title: ".cursorrules Included",
    description:
      "Architectural rules and anti-patterns defined. AI follows Clean Architecture automatically.",
    color: "bg-green-100 dark:bg-green-950",
  },
  {
    icon: Sparkles,
    title: "AI-Optimized DX",
    description:
      "Rich documentation, type-safe patterns, and helper scripts. Build faster with AI assistance.",
    color: "bg-yellow-100 dark:bg-yellow-950",
  },
];

export function AIFeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border-4 border-black dark:border-white bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Zap className="w-5 h-5" strokeWidth={3} />
            <span className="font-black uppercase text-sm">
              AI-First Development
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tight">
            Built for{" "}
            <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Assistants
            </span>
          </h2>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 font-medium">
            CleanStack is the{" "}
            <strong>
              first starter kit designed specifically for AI-assisted
              development
            </strong>
            . Every architectural decision is documented and optimized for AI
            comprehension.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div
                className={`h-full p-8 border-4 border-black dark:border-white ${feature.color} transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black dark:bg-white rounded-sm">
                    <feature.icon
                      className="w-8 h-8 text-white dark:text-black"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black uppercase mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border-4 border-black dark:border-white bg-black dark:bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-green-400 dark:text-green-600 font-mono text-sm">
                CLAUDE.md
              </span>
            </div>
            <pre className="text-green-400 dark:text-green-700 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
              <code>{`# AI Development Guidelines

## Mandatory Architectural Rules

### 1. Respect the Dependency Rule (CRITICAL)

**NEVER violate the dependency direction:**
- Domain MUST NOT import from Application
- Application MUST NOT import from Infrastructure
- All dependencies point INWARD

### 2. Error Handling Pattern (MANDATORY)

**NEVER throw exceptions** in Domain/Application.
Use Result<T> pattern for explicit error handling.

✅ CORRECT:
const result = Email.create(input.email)
if (result.isFailure) {
  return Result.fail(result.error)
}

❌ WRONG:
if (!input.email) {
  throw new Error('Email required') // NEVER
}`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
