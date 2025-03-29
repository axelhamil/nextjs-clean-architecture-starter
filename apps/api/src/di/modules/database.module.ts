import { env } from "@/shared/env";
import { TransactionService } from "@packages/drizzle/src/services/transaction-manager.service";
import type { ITransactionManagerService } from "@packages/drizzle/src/services/transaction-manager.type";
import { ContainerModule, type interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind): void => {
  if (env.NODE_ENV !== "test") {
    bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
      TransactionService,
    );
  } else {
    bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
      TransactionService,
    );
  }
};

export const DatabaseModule = new ContainerModule(initializeModule);
