type Options = {
    maxAttempts: number;
    retryDelay: number;
    onError: (err: any, attempt: any) => void;
};
declare function promiseRetry<T>(func: (attempt: number) => Promise<T>, options?: Partial<Options>, attempt?: number): Promise<T>;
export default promiseRetry;
