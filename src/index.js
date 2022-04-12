const defaultOptions = {
  maxAttempts: 10,
  retryDelay: 0,
}

function promiseRetry(func, options = defaultOptions, attempt = 1) {
  const config = { ...defaultOptions, ...options }

  return func(attempt).catch((err) => {
    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.retryDelay
        )
      })
    } else {
      throw err
    }
  })
}

module.exports = promiseRetry
