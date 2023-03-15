const sort = (array: number[]): number[] => {
  const sortedArray = [...array];

  if (array.length < 2) {
    return array;
  }

  const pivot = array.length - 1;
  let finalPivotPosition = -1;

  for (let index = 0; index < array.length; index++) {
    if (sortedArray[pivot] < sortedArray[index]) {
      continue;
    }

    finalPivotPosition += 1;

    // swap
    [sortedArray[index], sortedArray[finalPivotPosition]] = [
      sortedArray[finalPivotPosition],
      sortedArray[index],
    ];
  }

  const firstHalf = sort(sortedArray.slice(0, finalPivotPosition));
  const secondHalf = sort(sortedArray.slice(finalPivotPosition));

  return [...firstHalf, ...secondHalf];
};

export { sort };
