interface TestObject {
  [id: string]: {
    [id: number]: { [id: string]: number };
  };
}

const object: TestObject = {
  a: {
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 0, z: 0 },
    3: { x: 0, y: 0, z: 0 },
  },
  b: {
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 0, z: 0 },
    3: { x: 0, y: 0, z: 0 },
  },
  c: {
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 0, z: 0 },
    3: { x: 0, y: 0, z: 0 },
  },
};

console.log(object);

// O(n * j * k)
const newObject = Object.entries(object).reduce<TestObject>(
  (newObject, [key, value]) => ({
    ...newObject,
    [key]: {
      ...Object.entries(value).reduce<TestObject[number]>(
        (nestedObject, [nestedKey, nestedValue]) => ({
          ...nestedObject,
          ...{
            [nestedKey]: Object.entries(nestedValue).reduce<{
              [key: string]: number;
            }>(
              (
                nestedNestedObject,
                [nestedNestedKey, nestedNestedValue],
                index
              ) => ({
                ...nestedNestedObject,
                [nestedNestedKey]: +`${nestedKey}${nestedNestedValue}${index}`,
              }),
              {}
            ),
          },
        }),
        {}
      ),
    },
  }),
  {}
);

console.log(newObject);
