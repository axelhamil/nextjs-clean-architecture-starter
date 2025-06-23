/**
 * Represents the result of an operation, which can be either a success or a failure.
 * This pattern is useful for explicit error handling and chaining operations.
 * @template T The type of the value on success.
 * @template E The type of the error on failure (default: string).
 */
export class Result<T, E = string> {
  /**
   * Indicates if the result is a success.
   */
  public readonly isSuccess: boolean;
  /**
   * Indicates if the result is a failure.
   */
  public readonly isFailure: boolean;
  private readonly _value?: T;
  private readonly _error?: E;

  /**
   * Creates a new Result instance.
   * @param isSuccess Whether the result is a success.
   * @param value The value on success.
   * @param error The error on failure.
   * @private
   */
  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;
  }

  /**
   * Returns the value if the result is a success.
   * @throws {Error} If the result is a failure.
   */
  public getValue(): T {
    if (!this.isSuccess) throw new Error("Can't get value from failure result");

    // biome-ignore lint/style/noNonNullAssertion: It's safe to assert that the value is not undefined
    return this._value!;
  }

  /**
   * Returns the error if the result is a failure.
   * @throws {Error} If the result is a success.
   */
  public getError(): E {
    if (this.isSuccess) throw new Error("Can't get error from success result");

    // biome-ignore lint/style/noNonNullAssertion: It's safe to assert that the error is not undefined
    return this._error!;
  }

  /**
   * Creates a successful Result instance.
   * @template T The type of the value.
   * @template E The type of the error.
   * @param value The value to return on success.
   * @returns A successful Result instance.
   */
  public static ok<T, E = string>(value?: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  /**
   * Creates a failed Result instance.
   * @template T The type of the value.
   * @template E The type of the error.
   * @param error The error to return on failure.
   * @returns A failed Result instance.
   */
  public static fail<T, E = string>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  /**
   * Combines multiple Result instances, returning the first failure or a success if all succeed.
   * @param results Array of Result instances to combine.
   * @returns The first failure or a successful Result if all succeed.
   */
  public static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}
