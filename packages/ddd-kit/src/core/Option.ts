/**
 * Represents an optional value that may or may not contain a value.
 * This is a functional programming pattern similar to Rust's Option or Haskell's Maybe.
 * @template T The type of the value that may be contained
 */
export type Option<T> = Some<T> | None<T>;

/**
 * Represents an Option that contains a value.
 * @template T The type of the contained value.
 */
export class Some<T> {
  /**
   * @param value The value to contain.
   * @private
   */
  private constructor(private readonly value: T) {}

  /**
   * Creates a new Some instance containing the given value.
   * @template T The type of the value.
   * @param value The value to contain.
   * @returns A new Some instance.
   */
  static of<T>(value: T): Some<T> {
    return new Some(value);
  }

  /**
   * @returns true since Some always contains a value.
   */
  isSome(): this is Some<T> {
    return true;
  }

  /**
   * @returns false since Some always contains a value.
   */
  isNone(): this is None<T> {
    return false;
  }

  /**
   * @returns The contained value.
   */
  unwrap(): T {
    return this.value;
  }

  /**
   * Transforms the contained value using the provided function.
   * @template U The type of the transformed value.
   * @param fn The function to apply to the contained value.
   * @returns A new Some containing the transformed value.
   */
  map<U>(fn: (value: T) => U): Some<U> {
    return Some.of(fn(this.value));
  }
}

/**
 * Represents an Option that contains no value.
 * @template T The type that would be contained (for type consistency).
 */
export class None<T> {
  /**
   * @private
   */
  private constructor() {}

  /**
   * Creates a new None instance.
   * @template T The type that would be contained (for type consistency).
   * @returns A new None instance.
   */
  static of<T>(): None<T> {
    return new None();
  }

  /**
   * @returns false since None never contains a value.
   */
  isSome(): this is Some<T> {
    return false;
  }

  /**
   * @returns true since None never contains a value.
   */
  isNone(): this is None<T> {
    return true;
  }

  /**
   * @throws {Error} Always throws since None contains no value.
   */
  unwrap(): T {
    throw new Error("Cannot unwrap None");
  }

  /**
   * Returns None regardless of the mapping function.
   * @template U The type that would result from the transformation.
   * @param _fn The function that would be applied (ignored).
   * @returns A new None instance.
   */
  map<U>(_fn: (value: T) => U): None<U> {
    return None.of();
  }
}
