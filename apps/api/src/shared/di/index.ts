import { env } from "@shared/env";
import { Container } from "inversify";
import { type DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

export const SESSION_COOKIE = "session";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = (): void => {
  // ApplicationContainer.load(TodoModule);
  // ApplicationContainer.load(UserModule);
  // ApplicationContainer.load(AuthModule);
};

export const destroyContainer = (): void => {
  // ApplicationContainer.unload(TodoModule);
  // ApplicationContainer.unload(UserModule);
  // ApplicationContainer.unload(AuthModule);
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
