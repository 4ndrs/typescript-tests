import { binary } from "./search";

describe("Search", () => {
  test("binary", () => {
    expect(binary([1, 2, 3, 4, 5], 2)).toBe(true);
    expect(binary([1, 2, 3, 4, 5], 0)).toBe(false);
    expect(binary([4, 5, 6, 7], 7)).toBe(true);
  });
});
