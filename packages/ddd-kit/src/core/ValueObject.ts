import { Result } from "./Result";

/**
 * Abstract base class for value objects in Domain-Driven Design.
 * Value objects are defined by their attributes and are immutable.
 * @template T The type of the value.
 */
export abstract class ValueObject<T> {
  protected readonly _value: T;

  /**
   * Creates a new ValueObject instance.
   * @param value The value to encapsulate.
   */
  public constructor(value: T) {
    this._value = Object.freeze(value);
  }

  /**
   * Returns the value of the value object.
   */
  get value(): T {
    return this._value;
  }

  /**
   * Checks if another value object is equal to this one.
   * @param other The value object to compare.
   * @returns True if the values are equal, false otherwise.
   */
  public equals(other: ValueObject<T>): boolean {
    return this._value === other.value;
  }

  /**
   * Validates the value object.
   * @param value The value to validate.
   * @returns A Result indicating success or failure.
   */
  protected abstract validate(value: T): Result<T>;

  /**
   * Creates a new value object instance after validation.
   * @template T The value object type.
   * @template V The value type.
   * @param value The value to encapsulate.
   * @returns A Result containing the value object or an error.
   */
  public static create<T extends ValueObject<V>, V>(
    this: new (
      value: V,
    ) => T,
    value: V,
  ): Result<T> {
    // biome-ignore lint/complexity/noThisInStatic: I need to use this to create the instance
    const ValueObjectConstructor = this as new (value: V) => T;

    const instance = new ValueObjectConstructor(value);
    const validationResult = instance.validate(value);

    if (validationResult.isFailure) {
      return Result.fail(validationResult.getError());
    }

    return Result.ok(instance);
  }
}
