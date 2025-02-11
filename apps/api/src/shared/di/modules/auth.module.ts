import { ContainerModule, type interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind): void => {
  // if (process.env.NODE_ENV === "test") {
  // } else {
  // }
};

export const AuthenticationModule = new ContainerModule(initializeModule);
