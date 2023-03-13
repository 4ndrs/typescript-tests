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
    const mitsuha = { name: "Mitsuha von Yamano" };
    const colette = { name: "Colette" };
    const beatrice = { name: "Beatrice von Bozes" };
    const adelaide = { name: "Adelaide von Ryner" };
    const sabine = { name: "Sabine" };
    const iris = { name: "Iris von Bozes" };
    const eline = { name: "Eline" };
    const klaus = { name: "Klaus von Bozes" };

    const tree = new NamedBinaryTree(
      mitsuha,
      colette,
      beatrice,
      adelaide,
      sabine,
      iris,
      klaus,
      eline
    );

    //            mitsuha
    //            /     \
    //       (colette)  sabine
    //         /    \
    //     beatrice iris
    //      /       /  \
    //  adelaide eline klaus
    //
    // Remove -> (colette) -> place in order successor
    //   (smallest in the right subtree, eline)
    //
    //            mitsuha
    //            /     \
    //        (eline)  sabine
    //         /    \
    //     beatrice iris
    //      /          \
    //  adelaide      klaus
    //

    expect(tree.remove("amalia")).not.toBeDefined();
    expect(tree.length).toBe(8);
    expect(tree.remove("colette")).toEqual(colette);
    expect(tree.length).toBe(7);
    expect(tree.find("colette")).not.toBeDefined();

    expect([...tree]).toEqual([
      mitsuha,
      eline,
      beatrice,
      adelaide,
      iris,
      klaus,
      sabine,
    ]);

    tree.remove(klaus.name);

    expect(tree.toArray({ breadthFirst: true })).toEqual([
      mitsuha,
      eline,
      sabine,
      beatrice,
      iris,
      adelaide,
    ]);

    tree.remove(beatrice.name);

    expect(tree.toArray({ breadthFirst: true })).toEqual([
      mitsuha,
      eline,
      sabine,
      adelaide,
      iris,
    ]);

    expect(tree.length).toBe(5);
  });

  test("Removing the root does not break the tree", () => {
    const mitsuha = { name: "Mitsuha von Yamano" };
    const colette = { name: "Colette" };
    const beatrice = { name: "Beatrice von Bozes" };
    const adelaide = { name: "Adelaide von Ryner" };
    const sabine = { name: "Sabine" };
    const iris = { name: "Iris von Bozes" };
    const eline = { name: "Eline" };
    const klaus = { name: "Klaus von Bozes" };

    const tree = new NamedBinaryTree(
      mitsuha,
      colette,
      beatrice,
      adelaide,
      sabine,
      iris,
      klaus,
      eline
    );

    //           (mitsuha)
    //            /     \
    //         colette  sabine
    //         /    \
    //     beatrice iris
    //      /       /  \
    //  adelaide eline klaus
    //
    // Remove -> (mitsuha)
    //
    //          (sabine)
    //            /
    //        colette
    //         /    \
    //     beatrice iris
    //      /       /  \
    //  adelaide eline klaus

    expect(tree.remove(mitsuha.name)).toEqual(mitsuha);
    expect(tree.length).toBe(7);

    expect(tree.toArray({ breadthFirst: true })).toEqual([
      sabine,
      colette,
      beatrice,
      iris,
      adelaide,
      eline,
      klaus,
    ]);

    expect(tree.remove(sabine.name)).toEqual(sabine);
    expect(tree.length).toBe(6);

    expect(tree.toArray({ breadthFirst: true })).toEqual([
      colette,
      beatrice,
      iris,
      adelaide,
      eline,
      klaus,
    ]);

    expect(tree.remove(colette.name)).toEqual(colette);
    expect(tree.remove(beatrice.name)).toEqual(beatrice);
    expect(tree.remove(iris.name)).toEqual(iris);
    expect(tree.remove(adelaide.name)).toEqual(adelaide);
    expect(tree.remove(eline.name)).toEqual(eline);
    expect(tree.remove(klaus.name)).toEqual(klaus);

    expect(tree.length).toBe(0);
    expect([...tree]).toEqual([]);
  });

  test("Able to iterate over with depth first approach", () => {
    const tree = new NamedBinaryTree();

    const mitsuha = { name: "Mitsuha von Yamano" };
    const colette = { name: "Colette" };
    const beatrice = { name: "Beatrice von Bozes" };
    const adelaide = { name: "Adelaide von Ryner" };
    const sabine = { name: "Sabine" };
    const iris = { name: "Iris von Bozes" };

    //            mitsuha
    //            /     \
    //        colette  sabine
    //         /    \
    //     beatrice iris
    //      /
    //  adelaide
    //
    // mitsuha -> colette -> beatrice -> adelaide -> iris -> sabine

    tree.insert(mitsuha);
    tree.insert(colette);
    tree.insert(beatrice);
    tree.insert(adelaide);
    tree.insert(sabine);
    tree.insert(iris);

    expect([...tree]).toEqual([
      mitsuha,
      colette,
      beatrice,
      adelaide,
      iris,
      sabine,
    ]);
  });

  test("Allows initializing the tree with multiple values", () => {
    const mitsuha = { name: "Mitsuha von Yamano", id: 3 };
    const colette = { name: "Colette", id: 4 };
    const beatrice = { name: "Beatrice von Bozes", id: 0 };

    const tree = new NamedBinaryTree(mitsuha, colette, beatrice);

    expect(tree.find(mitsuha.name)).toBeDefined();
    expect(tree.find(colette.name)).toBeDefined();
    expect(tree.find(beatrice.name)).toBeDefined();

    const tree2 = new NamedBinaryTree([colette, beatrice, mitsuha]);

    expect(tree2.find(mitsuha.name)).toBeDefined();
    expect(tree2.find(colette.name)).toBeDefined();
    expect(tree2.find(beatrice.name)).toBeDefined();
  });

  test("toArray can return an array using breadth first approach", () => {
    const mitsuha = { name: "Mitsuha von Yamano" };
    const colette = { name: "Colette" };
    const beatrice = { name: "Beatrice von Bozes" };
    const adelaide = { name: "Adelaide von Ryner" };
    const sabine = { name: "Sabine" };
    const iris = { name: "Iris von Bozes" };

    const tree = new NamedBinaryTree(
      mitsuha,
      colette,
      beatrice,
      adelaide,
      sabine,
      iris
    );

    //            mitsuha
    //            /     \
    //        colette  sabine
    //         /    \
    //     beatrice iris
    //      /
    //  adelaide
    //
    // mitsuha -> colette -> sabine -> beatrice -> iris -> adelaide

    expect(tree.toArray({ breadthFirst: true })).toEqual([
      mitsuha,
      colette,
      sabine,
      beatrice,
      iris,
      adelaide,
    ]);
  });
});
