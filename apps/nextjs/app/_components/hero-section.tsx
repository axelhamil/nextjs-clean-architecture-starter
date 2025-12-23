import { BrutalistButton } from "@packages/ui/components/ui/brutalist-button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-block mb-8 py-2 px-6 border-3 border-black dark:border-white bg-white dark:bg-black">
          <span className="font-bold uppercase tracking-wider text-sm">
            {t("badge")}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
          {t("title_part1")}
          <br />
          <span className="italic inline-block -rotate-2 bg-black dark:bg-white text-white dark:text-black px-4">
            {t("title_emphasis")}
          </span>
          <br />
          {t("title_part2")}
        </h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <BrutalistButton size="lg" asChild>
            <Link href="/docs/installation">{t("cta_start")}</Link>
          </BrutalistButton>
          <BrutalistButton size="lg" variant="outline" asChild>
            <Link
              href="https://github.com/axelhamil/nextjs-clean-architecture-starter"
              target="_blank"
            >
              {t("cta_github")}
            </Link>
          </BrutalistButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {["Next.js 16", "DDD", "Drizzle", "Turborepo"].map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 border-3 border-black dark:border-white bg-white dark:bg-black font-bold uppercase text-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
