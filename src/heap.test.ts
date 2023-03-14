import { MinHeap } from "./heap";

describe("Heaps", () => {
  test("Able to create an empty heap", () => {
    const heap = new MinHeap();

    expect(heap.length).toBe(0);
    expect(heap.peek()).not.toBeDefined();
  });

  test("Able to add elements", () => {
    const miiko = { name: "Takeshita Miiko", priority: 1 };
    const haruna = { name: "Kasuga Haruna", priority: -1 };
    const kurumi = { name: "Shiratori Kurumi", priority: 4 };

    const heap = new MinHeap<typeof miiko>();

    heap.push(miiko);
    expect(heap.length).toBe(1);
    expect(heap.peek()).toEqual(miiko);

    heap.push(kurumi);
    expect(heap.length).toBe(2);
    expect(heap.peek()).toEqual(miiko);

    heap.push(haruna);
    expect(heap.peek()).toEqual(haruna);

    heap.push(kurumi);
    expect(heap.peek()).toEqual(haruna);
  });

  test("Able to delete elements", () => {
    const miiko = { name: "Takeshita Miiko", priority: 1 };
    const miyu = { name: "Sakurada Miyu", priority: 2 };
    const haruna = { name: "Kasuga Haruna", priority: 3 };

    const heap = new MinHeap(miiko, miyu, haruna);

    expect(heap.peek()).toEqual(miiko);
    expect(heap.pop()).toEqual(miiko);
    expect(heap.length).toEqual(2);
    expect(heap.peek()).toEqual(miyu);
    expect(heap.pop()).toEqual(miyu);
    expect(heap.peek()).toEqual(haruna);
    expect(heap.pop()).toEqual(haruna);
    expect(heap.peek()).not.toBeDefined();
    expect(heap.pop()).not.toBeDefined();
    expect(heap.length).toBe(0);
  });
});
