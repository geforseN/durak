import { describe, expect, test } from "vitest";
import { calculateWinRatePercent } from "./calculate-win-rate-percent";

describe("calculateWinRatePercent", () => {
  const values = [
    {
      winsCount: 0,
      losesCount: 0,
      expected: "0",
    },
    {
      winsCount: 1,
      losesCount: 0,
      expected: "100%",
    },
    {
      winsCount: 0,
      losesCount: 1,
      expected: "0%",
    },
    {
      winsCount: 1,
      losesCount: 1,
      expected: "50%",
    },
    {
      winsCount: 4,
      losesCount: 1,
      expected: "80%",
    },
    {
      winsCount: 5,
      losesCount: 1,
      expected: "83.33%",
    },
  ] satisfies {
    winsCount: number;
    losesCount: number;
    expected: string;
  }[];

  test.for(values)(
    `calculateWinRate($winsCount, $lossesCount)`,
    ({ winsCount, losesCount, expected }) => {
      expect(calculateWinRatePercent({ winsCount, losesCount })).toBe(expected);
    },
  );
});
