import { LinkedList } from "./linked";

describe("Linked lists", () => {
  test("Initializes a list with undefined values", () => {
    const list = new LinkedList<number>();

    expect(list.length).toBe(0);
    expect(list.head).toBe(undefined);
    expect(list.tail).toBe(undefined);
  });

  test("Adds first pushed value as head and tail", () => {
    const list = new LinkedList<string>();

    list.push("degeso");

    expect(list.length).toBe(1);
    expect(list.head).toBe("degeso");
    expect(list.tail).toBe("degeso");
  });

  test("toArray returns an array with all elements", () => {
    const list = new LinkedList(1);

    list.push(2);
    list.push(3);

    expect(list.length).toBe(3);
    expect(list.toArray()).toEqual([1, 2, 3]);

    const list2 = new LinkedList("hello");

    list2.push("ciao");
    list2.unshift("hola");

    expect(list2.toArray()).toEqual(["hola", "hello", "ciao"]);

    const empty = new LinkedList<number>();

    expect(empty.toArray()).toEqual([]);
  });

  test("Lists are iterable", () => {
    const list = new LinkedList(1);

    list.push(2);
    list.push(3);

    expect([...list]).toEqual([1, 2, 3]);
  });

  test("Shift removes the first item and returns it", () => {
    const list = new LinkedList(1);

    list.unshift(2);
    list.unshift(3);

    expect([...list]).toEqual([3, 2, 1]);
    expect(list.shift()).toBe(3);
    expect([...list]).toEqual([2, 1]);
    expect(list.length).toBe(2);

    list.shift();
    list.shift();

    expect(list.head).not.toBeDefined();
    expect(list.tail).not.toBeDefined();
    expect(list.length).toBe(0);
  });
});
