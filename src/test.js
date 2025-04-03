import { Retryify } from "../lib/promise-retry.module.js";

const myAsyncFunctionThatSometimesFails = async (a, b) => {
  if (Math.random() < 0.2) {
    return a + b;
  } else {
    throw new Error("Random failure");
  }
};

const myAsyncFunctionRetry = Retryify(myAsyncFunctionThatSometimesFails, {});

try {
  const sum = await myAsyncFunctionRetry(1, 5);
  console.log("Success: ", sum);
} catch (err) {
  console.error("Failed after retries:", err);
}
