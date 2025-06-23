/**
 * Type alias for a query handler function.
 * Used for simple data retrieval operations without business logic.
 * @template TResponse The type of the response returned by the handler.
 * @template TArgs The tuple of argument types accepted by the handler.
 */
export type QueryHandler<
  TResponse,
  TArgs extends readonly unknown[] = readonly unknown[],
> = (...args: TArgs) => Promise<TResponse>;
