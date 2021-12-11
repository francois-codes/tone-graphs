import React from "react";
import { HelloWorld } from "..";
import renderer from "react-test-renderer";

describe("it renders correctly", () => {
  it("renders correctly", () => {
    const component = renderer.create(<HelloWorld />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
