import { describe, expect, it } from "vitest";
import { retryify } from "../src";

describe("Retry", () => {
  let i = 0;
  const targetValue = 3;
  const successOn3 = retryify(
    async () => {
      i = i + 1;

      if (i === targetValue) {
        return i;
      } else {
        throw new Error(`Attempt ${i}`);
      }
    },
    {
      retryDelay: 100,
      onError: (err, attempt) => {
        console.log(err);
      },
    },
  );

  it("retryify", async () => {
    expect(await successOn3()).toBe(targetValue);
  });
});
