import { Stack } from "./stack";

describe("Stack", () => {
  test("Pushing an element inserts it at the start", () => {
    const stack = new Stack(1);

    stack.push(2);
    stack.push(3);

    expect([...stack]).toEqual([3, 2, 1]);
  });

  test("Popping removes the first element", () => {
    const stack = new Stack("henlo");

    stack.push("adieu");
    stack.push("sayonara");

    expect(stack.pop()).toBe("sayonara");
    expect(stack.pop()).toBe("adieu");
  });
});
