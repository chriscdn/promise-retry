# @chriscdn/promise-retry

Retry a function returning a rejected promise until it resolves or exceeds the maximum attempt count.

## Installing

Using npm:

```bash
$ npm install @chriscdn/promise-retry
```

Using yarn:

```bash
$ yarn add @chriscdn/promise-retry
```

## Example

```js
const promiseRetry = require('@chriscdn/promise-reject')

function myFunction(attempt) {
	return new Promise((resolve, reject) => {

		// ... do something

		if (allIsFine) {
			resolve(<value>)
		} else {
			reject(<err>)
		}
	})

}

// Call myFunction until a resolved promise is returned, but not more than 10 times (default is 10)
promiseRetry(myFunction, 10)
	.then(value => {
		// myFunction resolved within 10 attempts
		// value is from the myFunction resolve call
	})
	.catch(err => {
		// myFunction failed to return a resolved promise within 10 attempts
		// err is the reject value from the last attempt
	})
```

## License

[MIT](LICENSE)