interface Test<Flag extends string> {
  flag: Flag;
  prop1: number;
  prop2: boolean;
  prop3?: string;
}

type InferFlag<test> = test extends Test<infer T> ? Test<T> : never;

const test = {
  flag: "degeso" as const,
  prop1: 1,
  prop2: true,
} satisfies Test<string>;

const inferred: InferFlag<typeof test> = test;

inferred.flag;

export {};
