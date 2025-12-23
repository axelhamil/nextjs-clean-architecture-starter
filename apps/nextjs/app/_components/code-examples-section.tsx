"use client";

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
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">
          {t("title")}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("value_object")}
              className={`px-6 py-3 border-3 border-black dark:border-white font-bold uppercase text-sm transition-all ${
                activeTab === "value_object"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-black hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              {t("tab_value_object")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("use_case")}
              className={`px-6 py-3 border-3 border-black dark:border-white font-bold uppercase text-sm transition-all ${
                activeTab === "use_case"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-black hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              {t("tab_use_case")}
            </button>
          </div>

          <div className="border-3 border-black dark:border-white bg-black dark:bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <pre className="text-green-400 dark:text-green-600 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
              {examples[activeTab]}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
