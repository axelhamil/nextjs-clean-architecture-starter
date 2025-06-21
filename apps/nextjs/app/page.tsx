import { Badge } from "@packages/ui/components/ui/badge";
import { Button } from "@packages/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

export default async function Home(): Promise<ReactNode> {
  const t = await getTranslations("home");
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/20" />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-muted/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-8 py-2 px-4 border-primary/30 bg-primary/10 text-primary rounded-full"
          >
            {t("hero.badge")}
          </Badge>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t.rich("hero.title", {
              span_primary: (chunks) => (
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-12">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto"
            >
              {t("hero.demo")}
            </Button>
          </div>

          {/* Included Features */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t("hero.features_title")}
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Drizzle ORM",
                "Turborepo",
                "shadcn/ui",
                "Biome",
              ].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 bg-muted/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
