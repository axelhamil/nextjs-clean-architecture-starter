import { BrutalistButton } from "@packages/ui/components/ui/brutalist-button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function FinalCTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="py-32 bg-white dark:bg-black border-t-3 border-black dark:border-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <BrutalistButton size="lg" asChild>
          <Link href="/docs/installation">{t("button")}</Link>
        </BrutalistButton>
      </div>
    </section>
  );
}
