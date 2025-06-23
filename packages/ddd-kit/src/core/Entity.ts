import { DomainException, ValueObject, WatchedList } from "..";
import { UUID } from "./UUID";

/**
 * Interface for domain entities.
 * Entities are objects defined by their identity rather than their attributes.
 */
export interface IEntity {
  /**
   * Unique identifier of the entity.
   */
  readonly _id: UUID<string | number>;
  /**
   * Checks if another object is equal to this entity.
   * @param object The object to compare.
   * @returns True if the objects are equal, false otherwise.
   */
  equals(object?: IEntity): boolean;
  /**
   * Returns the properties of the entity.
   */
  getProps(): unknown;
  /**
   * Converts the entity to a plain object.
   */
  toObject(): Record<string, unknown>;
}

/**
 * Checks if a value is an entity.
 * @param v The value to check.
 * @returns True if the value is an entity, false otherwise.
 */
function isEntity(v: unknown): v is IEntity {
  return v instanceof Entity;
}

/**
 * Abstract base class for domain entities.
 * Entities are defined by their unique identity and encapsulate domain logic.
 * @template T The type of the entity's properties.
 */
export abstract class Entity<T> implements IEntity {
  protected readonly _props: T;
  public readonly _id: UUID<string | number>;

  /**
   * Creates a new Entity instance.
   * @param props The properties of the entity.
   * @param id Optional unique identifier for the entity.
   */
  protected constructor(props: T, id?: UUID<string | number>) {
    this._id = id || new UUID();
    this._props = props;
  }

  /**
   * Checks if another object is equal to this entity.
   * @param object The object to compare.
   * @returns True if the objects are equal, false otherwise.
   */
  public equals(object?: IEntity): boolean {
    if (!object || this === object || !isEntity(object)) return false;

    return this._id.equals(object._id);
  }

  /**
   * Gets a property value by key.
   * @param key The property key.
   * @returns The value of the property.
   * @throws DomainException if the property does not exist.
   */
  get<Key extends keyof T>(key: Key): T[Key] {
    const prop = this._props[key];

    if (key === "id" && !prop) {
      return this._id as unknown as T[Key];
    }

    if (prop === null) {
      return null as unknown as T[Key];
    }

    if (prop === undefined || prop === "") {
      throw new DomainException(
        `The property ${String(key)} doesn't exist in ${this.constructor.name}`,
        { cause: "The property doesn't exist in the entity" },
        "VALIDATION_ERROR",
      );
    }

    return prop;
  }

  /**
   * Returns a shallow copy of the entity's properties.
   */
  public getProps(): T {
    return { ...this._props };
  }

  /**
   * Converts the entity to a plain object, including nested value objects and entities.
   */
  public toObject(): Record<string, unknown> {
    const plainObject = {} as Record<string, unknown>;
    for (const key in this._props) {
      const prop = this._props[key];
      if (prop instanceof ValueObject || prop instanceof UUID) {
        plainObject[key] = prop.value;
      } else if (prop instanceof Entity) {
        plainObject[key] = prop.toObject();
      } else if (prop instanceof WatchedList) {
        plainObject[key] = prop.mapToObject();
      } else {
        plainObject[key] = prop;
      }
    }

    return {
      ...plainObject,
      id: this._id.value,
    };
  }

  /**
   * Creates a clone of the entity with optional property overrides.
   * @param props Optional properties to override in the clone.
   * @returns A new instance of the entity with the same ID.
   */
  public clone(props?: Partial<T>): Entity<T> {
    const clonedProps = { ...this._props, ...props };

    const EntityConstructor = this.constructor as new (
      props: T,
      id?: UUID<string | number>,
    ) => Entity<T>;

    return new EntityConstructor(clonedProps, this._id);
  }
}
