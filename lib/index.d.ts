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
declare const promiseRetry: <T>(func: (attempt: number) => Promise<T>, options?: Partial<RetryOptions>, attempt?: number) => Promise<T>;
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
declare const retryify: <Args extends unknown[], Return>(cb: (...args: Args) => Promise<Return>, options?: Partial<RetryOptions>) => (...args: Args) => Promise<Return>;

export { type RetryOptions, promiseRetry, retryify };
