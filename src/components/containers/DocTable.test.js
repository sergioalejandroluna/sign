import React from "react";
import ReadCell from "../ReadCell";
import { render, shallow, mount } from "enzyme";
import DocTable from "./DocTable";
import { Table, Button, TableFooter } from "@material-ui/core";
import db from "../../db.js";
import DocStore from "../../stores/DocStore";
const mockDocs = db().docs;
DocStore.fetch = () => {
  return new Promise(resolve => {
    resolve({ data: { docs: mockDocs, total: 10 } });
  });
};
DocStore.getInboxChannel = newMessage => {
  newMessage = () => {};
};
const wrapper = shallow(<DocTable fetch="inbox" />);
it("should render a  table", function() {
  expect(wrapper.find(Table).length).toBe(1);
});
it("should render table footer ", function() {
  expect(wrapper.find(TableFooter).length).toBe(1);
});
it("it should have  table footer ", function() {
  expect(wrapper.find(TableFooter).length).toBe(1);
});
it("it should have  delete button when is draft ", function() {
  wrapper.setProps({ fetch: "draft" });
  const labels = wrapper.find(Button).map(r => {
    return r.props().children.trim();
  });
  expect(labels).toEqual(expect.arrayContaining(["Borrar"]));
});
it("it should NOT have  delete button when is NOT draft ", function() {
  const getLabels = r => {
    return r.props().children.trim();
  };
  let labels = [];
  labels = labels.concat(wrapper.find(Button).map(getLabels));
  expect(labels).not.toEqual(["Borrar", "Borrar", "Ver", "Borrar"]);
});
it("it should have  read column when is sent  ", function() {
  wrapper.setProps({ fetch: "sent" });
  expect(wrapper.find(ReadCell).length > 0).toBe(true);
});
