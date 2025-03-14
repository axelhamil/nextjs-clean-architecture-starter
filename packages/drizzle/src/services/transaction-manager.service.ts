import { injectable } from "inversify";
import { type Transaction, db } from "../config";
import type { ITransactionManagerService } from "./transaction-manager.type";

@injectable()
export class TransactionService implements ITransactionManagerService {
  public async startTransaction<T>(
    callback: (trx: Transaction) => Promise<T>,
    parent?: Transaction,
  ): Promise<T> {
    const invoker = parent ?? db;

    return invoker.transaction(async (trx) => {
      try {
        const result = await callback(trx);
        return result;
      } catch (error) {
        trx.rollback();
        throw error;
      }
    });
  }
}
