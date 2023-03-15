const sort = (array: number[]) => {
  const sortedArray = [...array];

  for (let index = 0; index < array.length; index++) {
    if (
      index + 1 < array.length &&
      sortedArray[index + 1] < sortedArray[index]
    ) {
      // swap
      [sortedArray[index], sortedArray[index + 1]] = [
        sortedArray[index + 1],
        sortedArray[index],
      ];

      for (let innerIndex = index; innerIndex - 1 > -1; innerIndex--) {
        if (sortedArray[innerIndex] < sortedArray[innerIndex - 1]) {
          // swap
          [sortedArray[innerIndex], sortedArray[innerIndex - 1]] = [
            sortedArray[innerIndex - 1],
            sortedArray[innerIndex],
          ];
        } else {
          break;
        }
      }
    }
  }
  return sortedArray;
};

export { sort };
