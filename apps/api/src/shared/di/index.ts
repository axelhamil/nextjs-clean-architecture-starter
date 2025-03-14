import { env } from "@shared/env";
import { Container } from "inversify";
import { DatabaseModule } from "./modules/database.module";
import { type DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

export const SESSION_COOKIE = "session";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = (): void => {
  ApplicationContainer.load(DatabaseModule);
};

export const destroyContainer = (): void => {
  ApplicationContainer.unload(DatabaseModule);
};

if (env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
