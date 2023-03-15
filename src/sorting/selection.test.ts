import { sort } from "./selection";

describe("Selection sort", () => {
  test("Sample tests", () => {
    expect(sort([3, 5, 2, 8])).toEqual([2, 3, 5, 8]);
    expect(sort([64, 25, 12, 22, 11])).toEqual([11, 12, 22, 25, 64]);
  });
});
