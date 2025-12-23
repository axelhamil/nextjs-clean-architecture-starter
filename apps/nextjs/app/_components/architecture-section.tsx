import { useTranslations } from "next-intl";

export function ArchitectureSection() {
  const t = useTranslations("home.architecture");

  return (
    <section className="py-24 bg-black dark:bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 text-white dark:text-black">
          {t("title")}
        </h2>

        <div className="max-w-4xl mx-auto border-3 border-white dark:border-black bg-black dark:bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <pre className="text-green-400 dark:text-green-600 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
            {`┌─ CLEANSTACK ARCHITECTURE ────────────────────┐
│                                               │
│   HTTP Request                                │
│        ↓                                      │
│   ┌──────────────────────────────────────┐   │
│   │  [Adapters]                          │   │
│   │  Controllers & Presenters            │   │
│   └──────────────────────────────────────┘   │
│        ↓                                      │
│   ┌──────────────────────────────────────┐   │
│   │  [Application]                       │   │
│   │  Use Cases & Business Logic          │   │
│   └──────────────────────────────────────┘   │
│        ↓                                      │
│   ┌──────────────────────────────────────┐   │
│   │  [Domain]                            │   │
│   │  Entities & Value Objects            │   │
│   │  Aggregates & Domain Events          │   │
│   └──────────────────────────────────────┘   │
│        ↓                                      │
│   ┌──────────────────────────────────────┐   │
│   │  [Infrastructure]                    │   │
│   │  Database & External APIs            │   │
│   └──────────────────────────────────────┘   │
│                                               │
└───────────────────────────────────────────────┘`}
          </pre>

          <div className="mt-8 text-white dark:text-black">
            <p className="text-sm md:text-base mb-4">{t("description")}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 font-bold">→</span>
                <span>{t("layer_1")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">→</span>
                <span>{t("layer_2")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">→</span>
                <span>{t("layer_3")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">→</span>
                <span>{t("layer_4")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
