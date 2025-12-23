"use client";

import { BrutalistButton } from "@packages/ui/components/ui/brutalist-button";
import { Bot, Layers, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/docs/installation", label: "Installation", icon: Rocket },
  { href: "/docs/architecture", label: "Architecture", icon: Layers },
  { href: "/docs/claude-code", label: "Claude Code", icon: Bot },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen border-r-3 border-black dark:border-white bg-black dark:bg-white p-6">
          <Link href="/" className="block mb-12">
            <h1 className="text-2xl font-black uppercase text-white dark:text-black">
              CleanStack
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-600 uppercase mt-1">
              Documentation
            </p>
          </Link>

          <nav className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    flex items-center gap-3 px-4 py-3 border-3 transition-all
                    ${
                      isActive
                        ? "bg-white dark:bg-black text-black dark:text-white border-white dark:border-black"
                        : "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:translate-x-[2px] hover:translate-y-[2px]"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" strokeWidth={3} />
                  <span className="font-bold uppercase text-sm">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-12">
            <BrutalistButton variant="outline" size="sm" asChild>
              <Link
                href="https://github.com/axelhamil/nextjs-clean-architecture-starter"
                target="_blank"
                className="w-full text-white dark:text-black border-white dark:border-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
              >
                GitHub →
              </Link>
            </BrutalistButton>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-12 max-w-4xl">
          <article className="prose prose-lg max-w-none">{children}</article>
        </main>
      </div>
    </div>
  );
}
