import { describe, expect, it } from "vitest";
import { Retryify } from "../src";

describe("Retry", () => {
  let i = 0;
  const targetValue = 3;
  const successOn3 = Retryify(async () => {
    i = i + 1;

    if (i === targetValue) {
      return i;
    } else {
      throw new Error(`Attempt ${i}`);
    }
  }, {
    retryDelay: 100,
    onError: (err, attempt) => {
      console.log(err);
    },
  });

  it("Retryify", async () => {
    expect(await successOn3()).toBe(targetValue);
  });
});
