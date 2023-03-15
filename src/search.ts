const binary = (array: number[], value: number): boolean => {
  const middle = Math.floor(array.length / 2);

  if (middle === 0 && array[middle] !== value) {
    return false;
  }

  if (middle === 0 && array[middle] === value) {
    return true;
  }

  if (array[middle] > value) {
    return binary(array.slice(0, middle), value);
  }

  return binary(array.slice(middle), value);
};

export { binary };
