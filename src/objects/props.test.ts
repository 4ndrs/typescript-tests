import { generateProps } from "./props";

describe("Generate Properties", () => {
  test("Sample tests", () => {
    const activatedProps = {
      activate: true,
      activate_custom_prop: true,
      hello: "yo",
      activate_melody: true,
    };

    expect(generateProps(activatedProps)).toEqual(["customProp", "melody"]);
  });
});
