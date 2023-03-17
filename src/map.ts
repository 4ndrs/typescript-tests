const map = new Map<number, number>();

[4, 2, 3, 4].forEach((number) => {
  const count = map.get(number);

  if (count !== undefined) {
    map.set(number, count + 1);
    return;
  }

  map.set(number, 1);
});

console.log(map);
