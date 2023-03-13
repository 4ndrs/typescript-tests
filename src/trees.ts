class Node<T> {
  public right?: Node<T>;
  public left?: Node<T>;
  public value: T;

  constructor(value: T) {
    this.value = value;
  }
}

class NamedBinaryTree<T extends { name: string }> {
  private root?: Node<T>;
  private length_ = 0;

  constructor(...values: T[]);
  constructor(values?: T[]);
  constructor(...values: T[]) {
    if (Array.isArray(values[0])) {
      values = values[0];
    }

    values.forEach((value) => this.insert(value));
  }

  public get length() {
    return this.length_;
  }

  public insert(value: T) {
    let parent = this.root;

    for (const node of this.follow(value.name)) {
      if (node.value.name.toLowerCase() === value.name.toLowerCase()) {
        return;
      }

      if (
        (!node.right && !node.left) ||
        (!node.right &&
          value.name.toLowerCase() > node.value.name.toLowerCase()) ||
        (!node.left && value.name.toLowerCase() < node.value.name.toLowerCase())
      ) {
        parent = node;
        break;
      }
    }

    if (!parent) {
      this.root = new Node(value);
      this.length_ += 1;
      return;
    }

    if (value.name.toLowerCase() > parent.value.name.toLowerCase()) {
      parent.right = new Node(value);
    } else {
      parent.left = new Node(value);
    }

    this.length_ += 1;
  }

  public remove(name: string) {
    const { node, previous: parent } = this.findNode(name);

    if (!node || !parent) {
      return;
    }

    const isRoot = parent.value.name === node.value.name;

    const parentValueIsGreater =
      parent.value.name.toLowerCase() > node.value.name.toLowerCase();

    if (!node.left && !node.right) {
      if (isRoot) {
        this.root = undefined;
      } else if (parentValueIsGreater) {
        parent.left = undefined;
      } else {
        parent.right = undefined;
      }

      this.length_ -= 1;

      return node.value;
    }

    if (!node.left && node.right) {
      if (isRoot && this.root) {
        const right = this.root.right;

        this.root.right = undefined;
        this.root = right;
      } else if (parentValueIsGreater) {
        parent.left = node.right;
      } else {
        parent.right = node.right;
      }

      node.right = undefined;
      this.length_ -= 1;

      return node.value;
    }

    if (node.left && !node.right) {
      if (isRoot && this.root) {
        const left = this.root.left;

        this.root.left = undefined;
        this.root = left;
      } else if (parentValueIsGreater) {
        parent.left = node.left;
      } else {
        parent.right = node.left;
      }

      node.left = undefined;
      this.length_ -= 1;

      return node.value;
    }

    if (node.left && node.right) {
      const { successor, previous: successorParent } =
        this.findInOrderSuccessor(node);

      const right = node.right;
      const left = node.left;

      if (isRoot && this.root) {
        this.root.left = undefined;
        this.root.right = undefined;
        this.root = successor;
      } else if (parentValueIsGreater) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      if (successor.value.name !== right.value.name) {
        successor.right = right;
      }

      successor.left = left;

      if (!isRoot || successorParent.value.name !== node.value.name) {
        successorParent.left = undefined;
      }

      this.length_ -= 1;

      return node.value;
    }
  }

  public find(name: string) {
    for (const node of this.follow(name)) {
      if (node.value.name.toLowerCase() === name.toLowerCase()) {
        return node.value;
      }
    }
  }

  public toArray(options = { breadthFirst: false }) {
    return Array.from(this.valueGenerator(options));
  }

  public toString() {
    return JSON.stringify(this.root, null, 2);
  }

  [Symbol.iterator] = () => this.valueGenerator();

  private findNode(name: string, startNode = this.root) {
    const result = { previous: startNode, node: startNode };

    for (const node of this.follow(name, startNode)) {
      if (node.value.name.toLowerCase() === name.toLowerCase()) {
        result.node = node;

        return result;
      }
      result.previous = node;
    }

    return { previous: undefined, node: undefined };
  }

  private findInOrderSuccessor(startNode: Node<T>) {
    const result = { previous: startNode, successor: startNode };

    for (const node of this.follow(startNode.value.name, startNode)) {
      if (node.left) {
        result.previous = node;
      } else {
        result.successor = node;
        break;
      }
    }
    return result;
  }

  private *follow(value: string, startNode = this.root) {
    let node = startNode;

    while (node) {
      yield node;

      if (value.toLowerCase() < node.value.name.toLowerCase()) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }

  private *valueGenerator(options = { breadthFirst: false }) {
    const container: typeof this.root[] = [this.root];

    for (let node = container.pop(); node; node = container.pop()) {
      yield node.value;

      if (options.breadthFirst) {
        // Breadth First Search (BFS) (queue)
        if (node.left) {
          container.unshift(node.left);
        }

        if (node.right) {
          container.unshift(node.right);
        }

        continue;
      }

      // Depth First Search (DFS) (stack)
      if (node.right) {
        container.push(node.right);
      }

      if (node.left) {
        container.push(node.left);
      }
    }
  }
}

export { NamedBinaryTree };
