/**
 * Exception class for domain-specific errors.
 * Used to signal business rule violations or domain invariants.
 */
export class DomainException extends Error {
  /**
   * Creates a new DomainException instance.
   * @param message The error message.
   * @param options Optional error options.
   * @param code Optional error code for categorization.
   */
  constructor(
    public readonly message: string,
    public readonly options?: ErrorOptions,
    public readonly code?: string,
  ) {
    super(message, options);
  }
}
