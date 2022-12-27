export const main = () => {
  const firstArg = process.argv.slice(2)[0];

  say(firstArg);
};

const say = (text: string) => {
  console.info(text);
};
