const defaultOptions = {
  maxAttempts: 10,
  milliseconds: 0,
};

function promiseRetry(func, options = defaultOptions, attempt = 1) {
  const config = { ...defaultOptions, ...options };

  return func(attempt).catch((err) => {
    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.milliseconds
        );
      })
    } else {
      throw err
    }
  })
}

var src = promiseRetry;

export { src as default };
