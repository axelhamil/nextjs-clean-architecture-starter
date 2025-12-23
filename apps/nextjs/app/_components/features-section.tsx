import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@packages/ui/components/ui/brutalist-card";
import { Layers, Lock, Package, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  {
    key: "clean_architecture",
    icon: Layers,
  },
  {
    key: "ddd",
    icon: Sparkles,
  },
  {
    key: "type_safety",
    icon: Lock,
  },
  {
    key: "monorepo",
    icon: Package,
  },
];

export function FeaturesSection() {
  const t = useTranslations("home.features");

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map(({ key, icon: Icon }) => (
            <BrutalistCard key={key}>
              <BrutalistCardHeader>
                <Icon className="w-12 h-12 mb-4" strokeWidth={3} />
                <BrutalistCardTitle>{t(`${key}.title`)}</BrutalistCardTitle>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <BrutalistCardDescription className="text-base">
                  {t(`${key}.description`)}
                </BrutalistCardDescription>
              </BrutalistCardContent>
            </BrutalistCard>
          ))}
        </div>
      </div>
    </section>
  );
}
