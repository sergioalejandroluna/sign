import React from "react";
import DocHeader from "./DocHeader";
import { shallow } from "enzyme";
import DateClick from "./DateClick.js";
import { Logo } from "../img";
import { TextField } from "@material-ui/core";
import SearchUserField from "./SearchUserField";
import { DoneAll, Done } from "@material-ui/icons";
import db from "../db.js";
const doc = db().docs[1];
doc.to = db().users[1];
const wrapper = shallow(
  <DocHeader
    onDateChange={e => {}}
    onFolioChange={e => {}}
    date={doc.date}
    folio={doc.folio}
    to={doc.to}
    onToChange={e => {}}
    disabled={true}
    read={false}
    sent={true}
  />
);
it("should have a logo", function() {
  expect(wrapper.find("img").props().src).toBe(Logo);
});
it("should have a date", function() {
  expect(wrapper.find(DateClick).props().value).toBe(doc.date);
});
it("should have a doc name", function() {
  expect(wrapper.find(TextField).props().value).toBe(doc.folio);
});
it("should have a Greeting", function() {
  expect(wrapper.find(SearchUserField).props().to).toBe(doc.to);
});
it("should show done All icon when the target user read the document", function() {
  wrapper.setProps({ read: true });
  expect(wrapper.find(DoneAll).length).toBe(1);
});
it("should show done  icon when the target user has not read the document", function() {
  wrapper.setProps({ read: false });
  expect(wrapper.find(Done).length).toBe(1);
});
it("should not show any icon when the document is not send yet ", function() {
  wrapper.setProps({ sent: false });
  expect(wrapper.find(Done).length).toBe(0);
  expect(wrapper.find(DoneAll).length).toBe(0);
});
