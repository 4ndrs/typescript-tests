import { extractKeys, generateProps } from "./props";

describe("Generate Properties", () => {
  test("Sample tests", () => {
    const activatedProps = {
      activate: true,
      activate_custom_prop: true,
      hello: "yo",
      activate_melody: true,
    };

    expect(generateProps(activatedProps)).toEqual(["custom_prop", "melody"]);
  });

  test("Extract keys", () => {
    const props = {
      activate_custom_prop: true,
      custom_prop_key: "fire + bolt",
      custom_prop_param: "--firebolt",
    };

    const prop = generateProps(props)[0];

    expect(extractKeys(props, prop)).toEqual(["custom_prop_key"]);

    const props2 = {
      activate_stitch: true,
      stitch_key2: "key bold",
      stitch_param: "--keybold",
    };

    const prop2 = generateProps(props)[0];

    expect(extractKeys(props2, prop2)).toEqual([]);
  });
});
