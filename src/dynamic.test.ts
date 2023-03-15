import { fib, fibBottomUp, slowFib } from "./dynamic";

describe("fib", () => {
  test("fib", () => {
    expect(fib(54)).toBe(86267571272);
    expect(fib(56)).toBe(225851433717);
    expect(fib(66)).toBe(27777890035288);
    expect(fib(64)).toBe(10610209857723);
  });

  test("fib bottomUp", () => {
    expect(fibBottomUp(4)).toBe(3);
    expect(fibBottomUp(15)).toBe(610);
    expect(fibBottomUp(30)).toBe(832040);
    expect(fibBottomUp(70)).toBe(190392490709135);
  });

  test("slow fib", () => {
    expect(slowFib(6)).toBe(8);
    expect(slowFib(13)).toBe(233);
    expect(slowFib(27)).toBe(196418);
    expect(slowFib(21)).toBe(10946);
  });
});
