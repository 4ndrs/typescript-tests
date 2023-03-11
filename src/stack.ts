import { Linked } from "./linked";

class Stack<T> extends Linked<T> {
  public push(value: T) {
    return super.unshift(value);
  }

  public pop() {
    return super.shift();
  }
}

export { Stack };
