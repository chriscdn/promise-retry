type Options = {
    maxAttempts: number;
    retryDelay: number;
    onError: (err: any, attempt: number) => void;
};
declare function promiseRetry<T>(func: (attempt: number) => Promise<T>, options?: Partial<Options>, attempt?: number): Promise<T>;
export default promiseRetry;
