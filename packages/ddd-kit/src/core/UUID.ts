import { randomUUID } from "node:crypto";

/**
 * Represents a universally unique identifier (UUID) for entities and value objects.
 * @template T The type of the UUID value (string or number).
 */
export class UUID<T extends string | number> {
  protected readonly _value: T;
  /**
   * Creates a new UUID instance.
   * @param value Optional value for the UUID. If not provided, a random UUID is generated.
   */
  constructor(value?: T) {
    this._value = value ?? (randomUUID() as T);
  }
  /**
   * Returns the value of the UUID.
   */
  public get value(): T {
    return this._value;
  }

  /**
   * Creates a new UUID instance from another UUID.
   * @param id The UUID to copy.
   * @returns A new UUID instance with the same value.
   */
  public create(id: UUID<string | number>): UUID<string | number> {
    return new UUID<string | number>(id.value);
  }

  /**
   * Checks if another UUID is equal to this one.
   * @param id The UUID to compare.
   * @returns True if the UUIDs are equal, false otherwise.
   */
  equals(id?: UUID<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.value === this.value;
  }
}
