// O(n)
const sum = (numbers: number[]) =>
  numbers.reduce((accumulator, number) => accumulator + number, 0);

console.log(sum([1, 3, 10]));
