const defaultOptions = {
	maxAttempts: 10,
	timeout: 0
}

function promiseRetry(func, options = defaultOptions, attempt = 1) {

	const config = { ...defaultOptions, ...options }

	return func(attempt)
		.catch(err => {
			if (attempt < config.maxAttempts) {
				// return promiseRetry(func, options, attempt + 1)
				return new Promise(resolve => {
					setTimeout(() => resolve(promiseRetry(func, options, attempt + 1)), config.timeout)
				})
			} else {
				throw err
			}
		})
}

module.exports = promiseRetry