// src/index.ts
var defaultOptions = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (_err, _attempt) => {
  }
};
var promiseRetry = (func, options = defaultOptions, attempt = 1) => {
  const config = { ...defaultOptions, ...options };
  return func(attempt).catch((err) => {
    config.onError(err, attempt);
    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.retryDelay
        );
      });
    } else {
      throw err;
    }
  });
};
var retryify = (cb, options = {}) => (...args) => {
  return promiseRetry(() => {
    return cb(...args);
  }, options);
};
export {
  promiseRetry,
  retryify
};
//# sourceMappingURL=index.js.map