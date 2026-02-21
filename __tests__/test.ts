import { retryify } from "../src";

const myAsyncFunctionThatSometimesFails = async (a: number, b: number) => {
  if (Math.random() < 0.2) {
    return a + b;
  } else {
    throw new Error("Random failure");
  }
};

const myAsyncFunctionRetry = retryify(myAsyncFunctionThatSometimesFails, {
  onError: (err, _attempt) => {
    console.log(err);
  },
});

try {
  const sum = await myAsyncFunctionRetry(1, 5);
  console.log("Success: ", sum);
} catch (err) {
  console.error("Failed after retries:", err);
}
