import {
  findAdjacencies,
  findAdjacentNodes,
  Graph,
  isConnected,
  isConnectedB,
  Vertex,
} from "./graphs";

describe("Edges List", () => {
  test("Find adjacent nodes", () => {
    expect(findAdjacentNodes("Z")).toEqual([]);
    expect(findAdjacentNodes("A")).toEqual(["B", "D"]);
    expect(findAdjacentNodes("C")).toEqual(["D", "E"]);
    expect(findAdjacentNodes("B")).toEqual(["C"]);
  });

  test("Is connected", () => {
    expect(isConnected("A", "B")).toBe(true);
    expect(isConnected("B", "Z")).toBe(false);
    expect(isConnected("B", "C")).toBe(true);
  });
});

describe("Adjacency Matrix", () => {
  test("Find adjacencies", () => {
    const { A, B, C, D, E } = Vertex;

    expect(findAdjacencies(A)).toEqual([B, D]);
    expect(findAdjacencies(B)).toEqual([A, C]);
    expect(findAdjacencies(C)).toEqual([B, D]);
    expect(findAdjacencies(E)).toEqual([C, D]);
  });

  test("Is connected", () => {
    const { A, B, C, D, E } = Vertex;

    expect(isConnectedB(A, B)).toBe(true);
    expect(isConnectedB(C, E)).toBe(false);
    expect(isConnectedB(E, D)).toBe(true);
  });
});

describe("Adjacency List", () => {
  test("testing testing testing", () => {
    const rika = { name: "Seto Rika" };
    const marika = { name: "Mizushima Marika" };
    const saori = { name: "Hidaka Saori" };
    const dalia = { name: "Matsuyama Dalia" };
    const tsubaki = { name: "Aoyagi Tsubaki" };

    const graph = new Graph(rika, marika, saori, dalia, tsubaki);

    graph.connect(rika, marika);
    graph.connect(rika, dalia);
    graph.connect(marika, saori);
    graph.connect(saori, dalia);
    graph.connect(saori, tsubaki);
    graph.connect(dalia, tsubaki);

    //graph.print();

    expect(graph.getAdjacentNodes(rika)).toEqual([marika, dalia]);
    expect(graph.getAdjacentNodes(saori)).toEqual([marika, dalia, tsubaki]);

    expect(graph.isConnected(rika, dalia)).toBe(true);
    expect(graph.isConnected(rika, saori)).toBe(false);
  });

  test("breadth first search", () => {
    const bos = { name: "BOS" };
    const jfk = { name: "JFK" };
    const dfw = { name: "DFW" };
    const mia = { name: "MIA" };
    const lax = { name: "LAX" };
    const hnl = { name: "HNL" };
    const san = { name: "SAN" };
    const ewr = { name: "EWR" };
    const mico = { name: "MICO" };
    const pbi = { name: "PBI" };

    const graph = new Graph(bos, jfk, dfw, mia, lax, hnl, san, ewr, mico, pbi);

    graph.connect(dfw, lax);
    graph.connect(dfw, jfk);
    graph.connect(lax, hnl);
    graph.connect(lax, san);
    graph.connect(lax, ewr);
    graph.connect(jfk, mia);
    graph.connect(jfk, bos);
    graph.connect(mia, pbi);
    graph.connect(mia, mico);
    graph.connect(pbi, mico);

    expect(graph.traverse(dfw)).toEqual([
      dfw,
      lax,
      jfk,
      hnl,
      san,
      ewr,
      mia,
      bos,
      pbi,
      mico,
    ]);
  });

  test("find shortest path", () => {
    const bos = { name: "BOS" };
    const jfk = { name: "JFK" };
    const dfw = { name: "DFW" };
    const mia = { name: "MIA" };
    const lax = { name: "LAX" };
    const hnl = { name: "HNL" };
    const san = { name: "SAN" };
    const ewr = { name: "EWR" };
    const mico = { name: "MICO" };
    const pbi = { name: "PBI" };

    const graph = new Graph(bos, jfk, dfw, mia, lax, hnl, san, ewr, mico, pbi);

    graph.connect(dfw, lax);
    graph.connect(dfw, jfk);
    graph.connect(lax, hnl);
    graph.connect(lax, san);
    graph.connect(lax, ewr);
    graph.connect(jfk, mia);
    graph.connect(jfk, bos);
    graph.connect(mia, pbi);
    graph.connect(mia, mico);
    graph.connect(pbi, mico);

    //expect(graph.findShortestPath(dfw, lax)).toEqual([dfw, lax]);
    //expect(graph.findShortestPath(lax, mia)).toEqual([lax, dfw, jfk, mia]);

    console.log(graph.findShortestPath(dfw, pbi));

    //expect(graph.findShortestPath(dfw, pbi)).toEqual([dfw, jfk, mia, pbi]);
  });
});
