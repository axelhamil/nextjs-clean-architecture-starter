import type { Metadata } from "next";
import { Sora } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import Providers from "../common/providers";
import "./global.css";

import "@packages/ui/globals.css";
import { Toaster } from "@packages/ui/index";
import { getLocale } from "next-intl/server";

const sora = Sora({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "CleanStack - Next.js Clean Architecture Monorepo Starter",
    template: "%s | CleanStack",
  },
  description:
    "Production-ready Next.js 16 monorepo starter with Clean Architecture and Domain-Driven Design (DDD). Built with TypeScript, Turborepo, Drizzle ORM, and shadcn/ui. Perfect for scalable enterprise applications with type-safe patterns, Result/Option monads, and comprehensive DDD toolkit. AI-friendly codebase optimized for Claude Code, Cursor, and other AI assistants.",
  keywords: [
    "Next.js 16",
    "Clean Architecture",
    "Domain-Driven Design",
    "DDD",
    "TypeScript",
    "Monorepo",
    "Turborepo",
    "Drizzle ORM",
    "PostgreSQL",
    "shadcn/ui",
    "Tailwind CSS 4",
    "React Server Components",
    "Type-safe",
    "Result Pattern",
    "Value Objects",
    "Aggregates",
    "Use Cases",
    "Enterprise",
    "Scalable",
    "Production-ready",
    "Boilerplate",
    "Starter",
    "Template",
    "AI-friendly",
    "Claude Code",
    "Cursor AI",
    "Agentic coding",
    "PNPM",
    "Vitest",
    "Biome",
    "i18n",
  ],
  authors: [{ name: "AxelHamil", url: "https://github.com/axelhamil" }],
  creator: "AxelHamil",
  publisher: "AxelHamil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://github.com/axelhamil"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/axelhamil/nextjs-clean-architecture-starter",
    title: "CleanStack - Next.js Clean Architecture Monorepo Starter",
    description:
      "Production-ready Next.js 16 monorepo with Clean Architecture, DDD patterns, and comprehensive DDD toolkit. Type-safe, scalable, and AI-friendly. Perfect for enterprise applications.",
    siteName: "CleanStack",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CleanStack - Next.js Clean Architecture & DDD Monorepo Starter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanStack - Next.js Clean Architecture Monorepo",
    description:
      "Production-ready Next.js 16 monorepo with Clean Architecture and DDD. Type-safe, scalable, AI-friendly.",
    images: ["/og-image.png"],
    creator: "@axelhamil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  applicationName: "CleanStack",
  other: {
    "ai-context":
      "This is a Next.js monorepo starter implementing Clean Architecture and Domain-Driven Design patterns. It includes a comprehensive DDD toolkit with Entities, Value Objects, Aggregates, Domain Events, Result/Option monads, and Use Case patterns. Built with TypeScript, Turborepo, Drizzle ORM, PostgreSQL, shadcn/ui components, and Tailwind CSS 4. Optimized for AI-assisted development with Claude Code integration, comprehensive CLAUDE.md documentation, and .cursorrules for AI coding guidelines.",
    "project-type": "monorepo-starter-template",
    "architecture-pattern": "clean-architecture-ddd",
    "ai-friendly": "true",
  },
};
