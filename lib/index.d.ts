type RetryOptions = {
    maxAttempts: number;
    retryDelay: number;
    onError: (err: any, attempt: number) => void;
};
declare const promiseRetry: <T>(func: (attempt: number) => Promise<T>, options?: Partial<RetryOptions>, attempt?: number) => Promise<T>;
declare const Retryify: <Args extends unknown[], Return>(cb: (...args: Args) => Promise<Return>, options?: Partial<RetryOptions>) => (...args: Args) => Promise<Return>;
export { promiseRetry, Retryify, type RetryOptions };
