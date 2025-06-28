import type { Transaction } from "@packages/drizzle";
import type { IEntity } from "../core/Entity";
import type { Option } from "../core/Option";
import type { Result } from "../core/Result";

/**
 * Base interface for repositories in Domain-Driven Design.
 * Repositories abstract the persistence layer for aggregates/entities.
 * @template T The type of entity managed by the repository.
 */
export interface BaseRepository<T extends IEntity<unknown>> {
  /**
   * Persists a new entity.
   * @param entity The entity to create.
   * @returns A Result indicating success or failure.
   */
  create(entity: T, trx?: Transaction): Promise<Result<T>>;
  /**
   * Updates an existing entity.
   * @param entity The entity to update.
   * @returns A Result indicating success or failure.
   */
  update(entity: T, trx?: Transaction): Promise<Result<T>>;
  /**
   * Deletes an entity.
   * @param entity The entity to delete.
   * @returns A Result indicating success or failure.
   */
  delete(entity: T["_id"], trx?: Transaction): Promise<Result<T["_id"]>>;
  /**
   * Finds an entity by its unique identifier.
   * @param id The unique identifier.
   * @returns An Option containing the entity or None.
   */
  findById(id: T["_id"]): Promise<Result<Option<T>>>;
  /**
   * Finds all entities.
   * @returns An Option containing an array of entities or None.
   */
  findAll(): Promise<Result<T[]>>;
  /**
   * Finds an entity by matching properties.
   * @param props Partial properties to match.
   * @returns An Option containing the entity or None.
   */
  findBy(props: Partial<T["_props"]>): Promise<Result<Option<T>>>;
  /**
   * Checks if an entity exists by its unique identifier.
   * @param id The unique identifier.
   * @returns True if the entity exists, false otherwise.
   */
  exists(id: T["_id"]): Promise<Result<boolean>>;
  /**
   * Returns the total number of entities.
   */
  count(): Promise<Result<number>>;
}
