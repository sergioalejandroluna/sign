import React from "react";
import { shallow } from "enzyme";
import AttachThings from "./AttachThings.js";
import { Chip } from "@material-ui/core";

const files = ["some.txt", "another.jpg"];
const wrapper = shallow(
  <AttachThings
    open={false}
    onClose={() => {}}
    onChange={() => {}}
    files={files}
    onDelete={() => {}}
    readOnly={false}
  />
).dive();
it("should have a list of files", function() {
  expect(wrapper.find(Chip).length).toBe(files.length);
});
