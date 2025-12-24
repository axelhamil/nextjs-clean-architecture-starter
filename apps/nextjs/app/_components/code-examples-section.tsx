"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const examples = {
  value_object: `export class Email extends ValueObject<EmailProps> {
  protected validate(props: EmailProps): Result<EmailProps> {
    if (!emailRegex.test(props.value)) {
      return Result.fail("Invalid email");
    }
    return Result.ok(props);
  }

  get value(): string {
    return this.props.value;
  }
}`,
  use_case: `export class CreateUserUseCase {
  constructor(
    private userRepo: IUserRepository
  ) {}

  async execute(input: CreateUserInput): Promise<Result<User>> {
    const emailOrError = Email.create(input.email);
    if (emailOrError.isFailure) {
      return Result.fail(emailOrError.getError());
    }

    const user = User.create({
      email: emailOrError.getValue(),
      name: input.name
    });

    await this.userRepo.save(user);
    return Result.ok(user);
  }
}`,
};

export function CodeExamplesSection() {
  const t = useTranslations("home.code");
  const [activeTab, setActiveTab] = useState<"value_object" | "use_case">(
    "value_object",
  );

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative code symbols floating */}
      <motion.div
        className="absolute top-20 right-20 text-6xl font-mono text-black/5 dark:text-white/5 select-none"
        animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        {"{"}
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 text-6xl font-mono text-black/5 dark:text-white/5 select-none"
        animate={{ rotate: [0, -10, 0], y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        {"}"}
      </motion.div>

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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 mb-6"
          >
            <motion.button
              type="button"
              onClick={() => setActiveTab("value_object")}
              whileHover={{ scale: activeTab !== "value_object" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border-3 border-black dark:border-white font-bold uppercase text-sm transition-all ${
                activeTab === "value_object"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                  : "bg-white dark:bg-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
              }`}
            >
              {t("tab_value_object")}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setActiveTab("use_case")}
              whileHover={{ scale: activeTab !== "use_case" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border-3 border-black dark:border-white font-bold uppercase text-sm transition-all ${
                activeTab === "use_case"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                  : "bg-white dark:bg-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
              }`}
            >
              {t("tab_use_case")}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-4 border-black dark:border-white bg-black dark:bg-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
          >
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 dark:text-green-600 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto"
              >
                {examples[activeTab]}
              </motion.pre>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
