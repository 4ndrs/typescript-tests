type Props = { [key: string]: boolean | string };

const generateProps = (prop: Props) => {
  const activatedProps: string[] = [];

  Object.keys(prop).forEach((key) => {
    const words = key.split("_");

    if (prop[key] && words[0] === "activate" && words.length > 1) {
      const modifiedProp = [
        words[1],
        words.slice(2).map((word) => capitalize(word)),
      ].join("");

      activatedProps.push(modifiedProp);
    }
  });

  return activatedProps;
};

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export { generateProps };
