export const main = () => {
  const firstArg = process.argv.slice(2)[0];

  say(firstArg);
};

const say = (text: string) => {
  console.info(text);
};

declare const getTesting: () => {
  foo: string[] | undefined;
  bar: string[] | undefined;
};

const someFunction = () => {
  const testing = getTesting();

  if (!testing.foo && !testing.bar) {
    return;
  }

  if (!testing.foo && testing.bar) {
    return;
  }

  if (testing.foo && !testing.bar) {
    return;
  }

  if (testing.foo && testing.bar) {
    return;
  }

  testing.foo; // (property) foo: string[] | undefined
  testing.bar; // (property) bar: string[] | undefined
};

const someOtherFunction = () => {
  const testing = getTesting();

  if (!testing.foo) {
    return;
  }

  testing.foo; // (property) foo: string[]
  testing.bar; // (property) bar: string[] | undefined
};

someFunction();
someOtherFunction();
