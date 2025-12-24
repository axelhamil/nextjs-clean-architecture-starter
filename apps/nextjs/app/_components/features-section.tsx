"use client";

import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@packages/ui/components/ui/brutalist-card";
import { motion } from "framer-motion";
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
    <section className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 border-4 border-black dark:border-white"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 bg-black dark:bg-white"
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black uppercase text-center mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map(({ key, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <BrutalistCard className="h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
                <BrutalistCardHeader>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Icon className="w-12 h-12 mb-4" strokeWidth={3} />
                  </motion.div>
                  <BrutalistCardTitle>{t(`${key}.title`)}</BrutalistCardTitle>
                </BrutalistCardHeader>
                <BrutalistCardContent>
                  <BrutalistCardDescription className="text-base">
                    {t(`${key}.description`)}
                  </BrutalistCardDescription>
                </BrutalistCardContent>
              </BrutalistCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
