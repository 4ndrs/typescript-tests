const sort = (array: number[]) => {
  const sortedArray = [...array];

  for (let index = 0; index < array.length; index++) {
    let minIndex = index;

    for (let innerIndex = index + 1; innerIndex < array.length; innerIndex++) {
      if (sortedArray[innerIndex] < sortedArray[minIndex]) {
        minIndex = innerIndex;
      }
    }

    // swap
    [sortedArray[index], sortedArray[minIndex]] = [
      sortedArray[minIndex],
      sortedArray[index],
    ];
  }

  return sortedArray;
};

export { sort };
