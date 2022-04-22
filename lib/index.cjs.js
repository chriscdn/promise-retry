'use strict';

const defaultOptions = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (err, attempt) => {},
};

function promiseRetry(func, options = defaultOptions, attempt = 1) {
  const config = { ...defaultOptions, ...options };

  return func(attempt).catch((err) => {
    // For logging...
    config.onError(err, attempt);

    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.retryDelay
        );
      })
    } else {
      throw err
    }
  })
}

module.exports = promiseRetry;
