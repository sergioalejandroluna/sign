import React from "react";
import ReadCell from "./ReadCell";
import { shallow } from "enzyme";
import { TableCell } from "@material-ui/core";
import DocStore from "../stores/DocStore";
import { DoneAll } from "@material-ui/icons";

DocStore.getReadChannel = (id, onRead) => {
  onRead = () => {};
};
const wrapper = shallow(<ReadCell read={true} id={1} />);
it("should render a  TableCell", function() {
  expect(wrapper.find(TableCell).length).toBe(1);
});
it("should render DoneAll icon when the props is read", function() {
  wrapper.setProps({ read: true });
  expect(wrapper.find(DoneAll).length).toBe(1);
});
