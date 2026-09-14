//#region src/index.ts
/**
* Default retry configuration.
*/
const defaultOptions = {
	maxAttempts: 10,
	retryDelay: 0,
	onError: (_err, _attempt) => {}
};
/**
* Retries an asynchronous function until it resolves or the maximum number of
* attempts is reached.
*
* The provided function is invoked immediately. If it rejects, it will be
* retried according to the configured options.
*
* @typeParam T - The resolved value type of the promise.
* @param func - A function returning a promise. Receives the current attempt
* number.
* @param options - Optional retry configuration that overrides defaults.
* @param attempt - Internal attempt counter. Do not set manually.
* @returns A promise that resolves with the successful result or rejects with
* the last encountered error after exhausting retries.
*/
const promiseRetry = (func, options = defaultOptions, attempt = 1) => {
	const config = {
		...defaultOptions,
		...options
	};
	return func(attempt).catch((err) => {
		config.onError(err, attempt);
		if (attempt < config.maxAttempts) return new Promise((resolve) => {
			setTimeout(() => resolve(promiseRetry(func, options, attempt + 1)), config.retryDelay);
		});
		else throw err;
	});
};
/**
* Wraps an asynchronous function with retry behavior.
*
* The returned function preserves the original arguments and automatically
* retries the underlying promise if it rejects.
*
* @typeParam Args - Argument types of the wrapped function.
* @typeParam Return - Resolved value type of the wrapped promise.
* @param cb - The asynchronous function to wrap.
* @param options - Optional retry configuration.
* @returns A new function with identical parameters that applies retry logic.
*/
const retryify = (cb, options = {}) => (...args) => {
	return promiseRetry(() => {
		return cb(...args);
	}, options);
};
//#endregion
export { promiseRetry, retryify };

//# sourceMappingURL=index.js.map