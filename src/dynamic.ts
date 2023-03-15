type Memo = { [id: number]: number };

const fib = (number: number, memo?: Memo) => {
  if (!memo) {
    memo = {};
  }

  if (number in memo) {
    return memo[number];
  }

  let result: number;

  if (number === 1 || number === 2) {
    result = 1;
  } else {
    result = fib(number - 1, memo) + fib(number - 2, memo);
  }

  memo[number] = result;

  return result;
};

const fibBottomUp = (number: number) => {
  if (number === 1 || number === 2) {
    return 1;
  }

  const bottomUp: Memo = {};

  bottomUp[1] = 1;
  bottomUp[2] = 1;

  for (let index = 3; index <= number; index++) {
    bottomUp[index] = bottomUp[index - 1] + bottomUp[index - 2];
  }

  return bottomUp[number];
};

const slowFib = (number: number) => {
  let result: number;

  if (number === 1 || number === 2) {
    result = 1;
  } else {
    result = slowFib(number - 1) + slowFib(number - 2);
  }

  return result;
};

export { fib, fibBottomUp, slowFib };
