type Props = { [key: string]: boolean | string };

const generateProps = (prop: Props) => {
  const activatedProps: string[] = [];

  Object.keys(prop).forEach((key) => {
    const words = key.split("_");

    if (prop[key] && words[0] === "activate" && words.length > 1) {
      const modifiedProp = words.slice(1).join("_");

      activatedProps.push(modifiedProp);
    }
  });

  return activatedProps;
};

const extractKeys = (props: Props, prop: string) => {
  const regex = new RegExp(prop + "_key");

  const keys = Object.keys(props).filter((prop) => {
    return prop.match(regex);
  });

  return keys.filter((key) => {
    const suffix = key.replace(new RegExp(`^${prop}_key`), "");
    const param = `${prop}_param${suffix}`;

    return param in props;
  });
};

//const capitalize = (word: string) =>
//  word.charAt(0).toUpperCase() + word.slice(1);

export { generateProps, extractKeys };
