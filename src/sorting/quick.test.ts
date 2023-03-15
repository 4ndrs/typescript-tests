import { sort } from "./quick";

describe("Quick sort", () => {
  test("Sample tests", () => {
    expect(sort([8, 2, 4, 7, 1, 3, 9, 6, 5])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);

    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect(sort([3, 5, 2, 8])).toEqual([2, 3, 5, 8]);
    expect(sort([64, 25, 12, 22, 11])).toEqual([11, 12, 22, 25, 64]);
    expect(sort([35, 46, 36, 9, 15, 6, 3])).toEqual([3, 6, 9, 15, 35, 36, 46]);
  });
});
