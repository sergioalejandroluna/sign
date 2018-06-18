import React from "react";
import { shallow } from "enzyme";
import UserGroupDetail from "./UserGroupDetail";
import db from "../db.js";
import { TextField } from "@material-ui/core";
const mockGroups = db().user_groups;
const wrapper = shallow(
  <UserGroupDetail
    group={mockGroups[1]}
    onChange={e => {}}
    onClose={e => {}}
    open={true}
  />
);
it("should have fields for short name and long name ", function() {
  expect(wrapper.find(TextField).length).toBe(2);
});
it("should have a search component  ", function() {
  expect(wrapper.find("UserList").length).toBe(1);
});
