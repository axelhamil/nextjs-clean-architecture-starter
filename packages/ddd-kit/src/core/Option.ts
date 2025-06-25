/**
 * Implementation of Rust-like Option type in TypeScript
 */
export abstract class Option<T> {
  /**
   * Returns true if the option is a Some value
   */
  abstract isSome(): boolean;

  /**
   * Returns true if the option is a None value
   */
  abstract isNone(): boolean;

  /**
   * Returns the contained Some value
   * Throws an error if the value is None
   */
  abstract unwrap(): T;

  /**
   * Returns the contained Some value or a default value
   */
  abstract unwrapOr(defaultValue: T): T;

  /**
   * Returns the contained Some value or computes it from a closure
   */
  abstract unwrapOrElse(f: () => T): T;

  /**
   * Maps an Option<T> to Option<U> by applying a function to the contained value
   */
  abstract map<U>(f: (value: T) => U): Option<U>;

  /**
   * Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:
   * - Some(t) if predicate returns true
   * - None if predicate returns false
   */
  abstract filter(predicate: (value: T) => boolean): Option<T>;

  /**
   * Returns the option if it contains a value, otherwise returns optb
   */
  abstract or(optb: Option<T>): Option<T>;

  /**
   * Returns the option if it contains a value, otherwise calls f and returns the result
   */
  abstract orElse(f: () => Option<T>): Option<T>;

  /**
   * Returns Some if exactly one of self, optb is Some, otherwise returns None
   */
  abstract xor(optb: Option<T>): Option<T>;

  /**
   * Calls the provided closure with a reference to the contained value (if Some)
   */
  abstract inspect(f: (value: T) => void): Option<T>;

  /**
   * Maps an Option<T> to Option<U> by applying a function to the contained value that returns an Option<U>
   */
  abstract flatMap<U>(f: (value: T) => Option<U>): Option<U>;

  /**
   * Converts from Option<T> to T | undefined
   */
  abstract toUndefined(): T | undefined;

  /**
   * Converts from Option<T> to T | null
   */
  abstract toNull(): T | null;

  // Static factory methods
  static some<T>(value: T): Option<T> {
    return Some.of(value);
  }

  static none<T>(): Option<T> {
    return None.of<T>();
  }

  static fromNullable<T>(value: T | null | undefined): Option<T> {
    return value != null ? Option.some(value) : Option.none<T>();
  }
}
export class Some<T> extends Option<T> {
  private constructor(private readonly value: T) {
    super();
  }

  static of<T>(value: T): Option<T> {
    return new Some(value);
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse(_f: () => T): T {
    return this.value;
  }

  map<U>(f: (value: T) => U): Option<U> {
    return Option.some(f(this.value));
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : Option.none<T>();
  }

  or(_optb: Option<T>): Option<T> {
    return this;
  }

  orElse(_f: () => Option<T>): Option<T> {
    return this;
  }

  xor(optb: Option<T>): Option<T> {
    return optb.isNone() ? this : Option.none<T>();
  }

  inspect(f: (value: T) => void): Option<T> {
    f(this.value);
    return this;
  }

  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }

  toUndefined(): T | undefined {
    return this.value;
  }

  toNull(): T | null {
    return this.value;
  }

  toString(): string {
    return `Some(${this.value})`;
  }
}

export class None<T> extends Option<T> {
  private constructor() {
    super();
  }

  static of<T>(): Option<T> {
    return new None<T>();
  }

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }

  unwrap(): T {
    throw new Error("Called unwrap on a None value");
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse(f: () => T): T {
    return f();
  }

  map<U>(_f: (value: T) => U): Option<U> {
    return Option.none<U>();
  }

  filter(_predicate: (value: T) => boolean): Option<T> {
    return this;
  }

  or(optb: Option<T>): Option<T> {
    return optb;
  }

  orElse(f: () => Option<T>): Option<T> {
    return f();
  }

  xor(optb: Option<T>): Option<T> {
    return optb.isSome() ? optb : Option.none<T>();
  }

  inspect(_f: (value: T) => void): Option<T> {
    return this;
  }

  flatMap<U>(_f: (value: T) => Option<U>): Option<U> {
    return Option.none<U>();
  }

  toUndefined(): T | undefined {
    return undefined;
  }

  toNull(): T | null {
    return null;
  }

  toString(): string {
    return "None";
  }
}

/**
 * Pattern matching for Option type
 * @template T The type of the value in the Option
 * @template U The type of the result
 * @param option The Option to match against
 * @param patterns An object with two properties: Some and None
 * @returns The result of the pattern matching
 */
export const match = <T, U>(
  option: Option<T>,
  patterns: {
    Some: (value: T) => U;
    None: () => U;
  },
): U => {
  if (option.isSome()) {
    return patterns.Some(option.unwrap());
  }
  return patterns.None();
};
