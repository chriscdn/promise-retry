type RetryOptions = {
  maxAttempts: number;
  retryDelay: number;
  onError: (err: any, attempt: number) => void;
};

const defaultOptions: RetryOptions = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (err: any, attempt: number) => {},
};

const promiseRetry = <T>(
  func: (attempt: number) => Promise<T>,
  options: Partial<RetryOptions> = defaultOptions,
  attempt = 1,
): Promise<T> => {
  const config: RetryOptions = { ...defaultOptions, ...options };

  return func(attempt).catch((err: any) => {
    // For logging...
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

const Retryify = <Args extends unknown[], Return>(
  cb: (...args: Args) => Promise<Return>,
  options: Partial<RetryOptions> = {},
) =>
(...args: Args): Promise<Return> => {
  return promiseRetry<Return>(() => {
    return cb(...args);
  }, options);
};

export { promiseRetry, Retryify, type RetryOptions };
