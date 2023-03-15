import { sort } from "./insertion";

describe("Insertion sort", () => {
  test("Sample tests", () => {
    expect(sort([3, 5, 2, 8])).toEqual([2, 3, 5, 8]);
    expect(sort([64, 25, 12, 22, 11])).toEqual([11, 12, 22, 25, 64]);
    expect(sort([35, 46, 36, 9, 15, 6, 3])).toEqual([3, 6, 9, 15, 35, 36, 46]);
  });
});
