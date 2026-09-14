/**
 * Configuration options for retry behavior.
 */
type RetryOptions = {
  /**
   * Maximum number of attempts before giving up. Includes the initial attempt.
   */
  maxAttempts: number;

  /**
   * Delay in milliseconds between retry attempts.
   */
  retryDelay: number;

  /**
   * Callback invoked after a failed attempt. Receives the thrown error and the
   * current attempt number.
   */
  onError: (err: any, attempt: number) => void;
};

/**
 * Default retry configuration.
 */
const defaultOptions: RetryOptions = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (_err: unknown, _attempt: number) => {},
};

/**
 * Retries an asynchronous function until it resolves or the maximum number of
 * attempts is reached.
 *
 * The provided function is invoked immediately. If it rejects, it will be
 * retried according to the configured options.
 *
 * @typeParam T - The resolved value type of the promise.
 * @param func - A function returning a promise. Receives the current attempt
 * number.
 * @param options - Optional retry configuration that overrides defaults.
 * @param attempt - Internal attempt counter. Do not set manually.
 * @returns A promise that resolves with the successful result or rejects with
 * the last encountered error after exhausting retries.
 */
const promiseRetry = <T>(
  func: (attempt: number) => Promise<T>,
  options: Partial<RetryOptions> = defaultOptions,
  attempt = 1,
): Promise<T> => {
  const config: RetryOptions = { ...defaultOptions, ...options };

  return func(attempt).catch((err: unknown) => {
    config.onError(err, attempt);

    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.retryDelay,
        );
      });
    } else {
      throw err;
    }
  });
};

/**
 * Wraps an asynchronous function with retry behavior.
 *
 * The returned function preserves the original arguments and automatically
 * retries the underlying promise if it rejects.
 *
 * @typeParam Args - Argument types of the wrapped function.
 * @typeParam Return - Resolved value type of the wrapped promise.
 * @param cb - The asynchronous function to wrap.
 * @param options - Optional retry configuration.
 * @returns A new function with identical parameters that applies retry logic.
 */
const retryify =
  <Args extends unknown[], Return>(
    cb: (...args: Args) => Promise<Return>,
    options: Partial<RetryOptions> = {},
  ) =>
  (...args: Args): Promise<Return> => {
    return promiseRetry<Return>(() => {
      return cb(...args);
    }, options);
  };

export { promiseRetry, retryify, type RetryOptions };
