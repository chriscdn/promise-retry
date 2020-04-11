function promiseRetry(func, maxAttempts = 10, attempt = 1) {
	return func(attempt)
		.catch(err => {
			if (attempt < maxAttempts) {
				return promiseRetry(func, maxAttempts, attempt + 1)
			} else {
				throw err
			}
		})
}

module.exports = promiseRetry