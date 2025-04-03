# @chriscdn/promise-retry

Retry an asynchronous function until it resolves successfully or exceeds the maximum attempt count.

## Installing

Using npm:

```bash
npm install @chriscdn/promise-retry
```

Using yarn:

```bash
yarn add @chriscdn/promise-retry
```

## Upgrading to v3

The import has changed from

```js
import promiseRetry from "@chriscdn/promise-retry";
```

to

```js
import { promiseRetry } from "@chriscdn/promise-retry";
```

## Example 1 - Async/Await

```js
import { promiseRetry, type RetryOptions } from "@chriscdn/promise-retry";

// all options are optional, defaults below
const options: RetryOptions = {
  maxAttempts: 10, // Maximum retry attempts (default: 10)
  retryDelay: 0, // Delay between retries (in ms)
  onError: (err, attempt) => {
    // log the error
  },
};

const results = await promiseRetry(async (attempt) => {
  // do something async in here
}, options);
```

## Example 2 - Retryify

`Retryify` wraps an asynchronous function and returns a new function with the same interface. If the original function fails (i.e., rejects its promise), it will automatically retry the function up to the specified number of times before rejecting.

```js
import { Retryify } from "@chriscdn/promise-retry";

const myAsyncFunctionRandomFails = async (a, b) => {
  if (Math.random() < 0.2) {
    return a + b;
  } else {
    throw new Error("Random failure");
  }
};

const myAsyncFunctionRetry = Retryify(myAsyncFunctionRandomFails, options);

try {
  const sum = await myAsyncFunctionRetry(1, 5);
  console.log("Success: ", sum);
} catch (err) {
  console.error("Failed after retries:", err);
}
```

## License

[MIT](LICENSE)
