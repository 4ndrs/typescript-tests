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
    return;
  }

  public find(name: string) {
    for (const node of this.follow(name)) {
      if (node.value.name.toLowerCase() === name.toLowerCase()) {
        return node.value;
      }
    }
  }

  public toString() {
    return JSON.stringify(this.root, null, 2);
  }

  private *follow(value: string) {
    let node = this.root;

    while (node) {
      yield node;

      if (value.toLowerCase() < node.value.name.toLowerCase()) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }

  [Symbol.iterator] = () => this.valueGenerator();

  // Depth First Search (DFS)
  private *valueGenerator() {
    const stack: typeof this.root[] = [];

    stack.push(this.root);

    for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
      yield node.value;

      if (node.right) {
        stack.push(node.right);
      }

      if (node.left) {
        stack.push(node.left);
      }
    }
  }
}

export { NamedBinaryTree };
