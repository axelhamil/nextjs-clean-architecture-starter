import type { ITransactionManagerService } from "@packages/drizzle/src/services/transaction-manager.type";

export const DI_SYMBOLS = {
  // Services
  ITransactionManagerService: Symbol.for("ITransactionManagerService"),

  // Repositories
};

export interface DI_RETURN_TYPES {
  // Services
  ITransactionManagerService: ITransactionManagerService;

  // Repositories
}
