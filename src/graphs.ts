// Edges List

// find adjacent nodes -> O(e) - (e)dges
// is connected -> O(e)

// const vertices = ["A", "B", "C", "D", "E"];

const edges = [
  ["A", "B"],
  ["A", "D"],
  ["B", "C"],
  ["C", "D"],
  ["C", "E"],
  ["D", "E"],
];

// find adjacent codes
const findAdjacentNodes = (node: string) =>
  // Loop through edges array
  // is node in the connection?
  // if yes, push the other node in pair, into adjacent nodes array
  edges.reduce<string[]>((accumulator, edge) => {
    // edge = ['A', 'B']
    if (edge[0] === node) {
      return [...accumulator, edge[1]];
    }

    return accumulator;
  }, []);

// is connected
const isConnected = (node1: string, node2: string) =>
  edges.some((edge) => edge.includes(node1) && edge.includes(node2));

// Adjacency Matrix

// find adjacent nodes -> O(v) - (v)ertices
// is connected -> O(1)
// space complexity -> O(v^2)

enum Vertex {
  A,
  B,
  C,
  D,
  E,
}

const adjacencyMatrix = [
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 1, 1, 0],
];

// find adjacencies
const findAdjacencies = (node: Vertex) =>
  adjacencyMatrix[node].reduce<Vertex[]>((accumulator, edge, vertex) => {
    if (edge) {
      return [...accumulator, vertex];
    }

    return accumulator;
  }, []);

const isConnectedB = (node1: Vertex, node2: Vertex) =>
  !!adjacencyMatrix[node1][node2];

// Adjacency List

// find adjacent nodes -> O(1)
// is connected -> O(log v) if row is sorted
// space complexity -> O(e)

//const vertices = ["a", "b", "c", "d", "e"];

/*const adjacencyList = [
  ["b", "d"],
  ["a", "c"],
  ["b", "d", "e"],
  ["a", "c", "e"],
  ["c", "d"],
];*/

class Node<T> {
  public value: T;
  public edgesList: Node<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  public connect(node: Node<T>) {
    this.edgesList.push(node);
    node.edgesList.push(this);
  }
}

class Graph<T extends { name: string }> {
  private nodes: { [key: string]: Node<T> } = {};

  constructor(...values: T[]);
  constructor(values: T[]);
  constructor(...values: T[]) {
    if (Array.isArray(values[0])) {
      values = values[0];
    }

    values.forEach((value) => this.push(value));
  }

  public push(value: T) {
    this.nodes[value.name] = new Node(value);
  }

  public connect(value1: T, value2: T) {
    const nodeA = this.nodes[value1.name];
    const nodeB = this.nodes[value2.name];

    if (!nodeA || !nodeB) {
      return;
    }

    nodeA.connect(nodeB);
  }

  public getAdjacentNodes(value: T) {
    const node = this.nodes[value.name];

    if (!node) {
      return;
    }

    return node.edgesList.map((edge) => edge.value);
  }

  public isConnected(value1: T, value2: T) {
    const node1 = this.nodes[value1.name];

    if (!node1) {
      return false;
    }

    return !!node1.edgesList.find((edge) => edge.value === value2);
  }

  public traverse(value: T) {
    const node = this.nodes[value.name];

    if (!node) {
      return;
    }

    return [...this.generator(node)].map((node) => node.value);
  }

  public print() {
    Object.values(this.nodes).forEach((node) =>
      node.edgesList.forEach((edge) =>
        console.info(`${node.value.name} is connected to ${edge.value.name}`)
      )
    );
  }

  private *generator(startNode: Node<T>) {
    // breadth first search (BFS)
    const queue = [startNode];
    const queued: { [key: string]: boolean } = {};

    queued[startNode.value.name] = true;

    for (let node = queue.pop(); node; node = queue.pop()) {
      yield node;

      const unvisitedChildren = node.edgesList.reduceRight<Node<T>[]>(
        (accumulator, child) => {
          if (queued[child.value.name]) {
            return accumulator;
          }

          queued[child.value.name] = true;

          return [...accumulator, child];
        },
        []
      );

      queue.unshift(...unvisitedChildren);
    }
  }
}

export {
  findAdjacentNodes,
  isConnected,
  findAdjacencies,
  Vertex,
  isConnectedB,
  Graph,
};
