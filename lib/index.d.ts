declare function promiseRetry<T>(func: (attempt: number) => Promise<T>, options?: {
    maxAttempts: number;
    retryDelay: number;
    onError: (err: any, attempt: number) => void;
}, attempt?: number): Promise<T>;
export default promiseRetry;
