import { NamedBinaryTree } from "./trees";

describe("Named binary trees", () => {
  test("Able to insert objects with names", () => {
    const mitsuha = { name: "Mitsuha Von Yamano", gender: "Female" };
    const collette = { name: "Colette", gender: "Female" };

    const tree = new NamedBinaryTree<typeof mitsuha>();

    expect(tree.length).toBe(0);
    tree.insert(mitsuha);
    expect(tree.length).toBe(1);
    tree.insert(collette);
    expect(tree.length).toBe(2);
  });

  test("Duplicates are ignored", () => {
    const mitsuha = { name: "Mitsuha von Yamano" };

    const tree = new NamedBinaryTree<typeof mitsuha>();

    tree.insert(mitsuha);
    expect(tree.length).toBe(1);
    tree.insert(mitsuha);
    expect(tree.length).toBe(1);
    tree.insert(mitsuha);
    expect(tree.length).toBe(1);
  });

  test("Able to find objects", () => {
    const mitsuha = { name: "Mitsuha von Yamano", id: 1 };
    const colette = { name: "Colette", id: 2 };
    const sabine = { name: "Sabine", id: 3 };

    const tree = new NamedBinaryTree<typeof mitsuha>();

    tree.insert(mitsuha);
    tree.insert(colette);
    tree.insert(sabine);

    expect(tree.find("Adelaide")).not.toBeDefined();
    expect(tree.find("Colette")).toEqual(colette);
    expect(tree.find("Mitsuha von Yamano")).toEqual(mitsuha);
    expect(tree.find("Sabine")).toEqual(sabine);
  });

  test("Able to remove objects", () => {
    const mitsuha = { name: "Mitsuha von Yamano", id: 1 };
    const colette = { name: "Colette", id: 2 };
    const sabine = { name: "Sabine", id: 3 };

    const tree = new NamedBinaryTree<typeof mitsuha>();

    tree.insert(mitsuha);
    tree.insert(colette);
    tree.insert(sabine);

    tree.remove("Adelaide");
    expect(tree.length).toBe(3);
    tree.remove("Sabine");
    expect(tree.length).toBe(2);
    expect(tree.find("Sabine")).not.toBeDefined();
  });
});
