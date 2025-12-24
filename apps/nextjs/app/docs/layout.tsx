"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

const navItems = [
  {
    href: "/docs/installation",
    label: "Getting Started",
    icon: "🚀",
  },
  {
    href: "/docs/architecture",
    label: "Architecture",
    icon: "🏗️",
  },
  {
    href: "/docs/claude-code",
    label: "AI Development",
    icon: "🤖",
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPage = navItems.find((item) => item.href === pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-lg hover:opacity-70 transition-opacity"
            >
              <BookOpen className="w-6 h-6" />
              <span className="hidden sm:inline">CleanStack</span>
            </Link>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/docs"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Docs
              </Link>
              {currentPage && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-black dark:text-white font-medium">
                    {currentPage.label}
                  </span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/axelhamil/nextjs-clean-architecture-starter"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 relative">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
												flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
												${
                          isActive
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }
											`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3 px-4">
                  Resources
                </div>
                <div className="space-y-1 text-sm">
                  <Link
                    href="https://github.com/axelhamil/nextjs-clean-architecture-starter"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </Link>
                  <Link
                    href="https://claude.ai/code"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    🤖 Claude Code
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-16 z-40 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            >
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="w-64 h-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`
													flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
													${
                            isActive
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                          }
												`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </motion.div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article
              className="prose prose-gray dark:prose-invert max-w-none
							prose-headings:font-bold prose-headings:tracking-tight
							prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0
							prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800
							prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
							prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
							prose-p:text-base prose-p:leading-7 prose-p:mb-6
							prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
							prose-strong:text-black dark:prose-strong:text-white prose-strong:font-semibold
							prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
							prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:border prose-pre:border-gray-700 dark:prose-pre:border-gray-800 prose-pre:rounded-xl prose-pre:shadow-lg
							prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
							prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
							prose-li:my-2 prose-li:leading-7
							prose-table:my-8
							prose-img:rounded-lg prose-img:shadow-lg
						"
            >
              {children}
            </article>

            {/* Navigation Footer */}
            <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              {(() => {
                const currentIndex = navItems.findIndex(
                  (i) => i.href === pathname,
                );
                const prevItem =
                  currentIndex > 0 ? navItems[currentIndex - 1] : null;
                const nextItem =
                  currentIndex < navItems.length - 1
                    ? navItems[currentIndex + 1]
                    : null;

                return (
                  <>
                    {prevItem && (
                      <Link
                        href={prevItem.href}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Previous
                      </Link>
                    )}

                    {nextItem && (
                      <Link
                        href={nextItem.href}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-auto"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </>
                );
              })()}
            </nav>
          </main>

          {/* Right Sidebar - Table of Contents (only on large screens) */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">
                On this page
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {/* TOC will be auto-generated */}
                <div className="text-xs italic">
                  Table of contents auto-generated from headings
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
