import React from "react";
import { shallow } from "enzyme";
import UserGroups from "./UserGroups";
import db from "../../db.js";
import { ListItemText } from "@material-ui/core";
import { Remove, Edit } from "@material-ui/icons";
import UserGroupStore from "../../stores/UserGroupStore";
const data = db();
const mockGroups = data.user_groups;
UserGroupStore.list = () => {
  return new Promise(resolve => {
    resolve({ data: mockGroups });
  });
};
let wrapper = shallow(<UserGroups />);
wrapper.setState({ groups: mockGroups });
it("should have a list with the name of the group", function() {
  const items = wrapper.find(ListItemText);
  for (let index; index < items.length; index++) {
    expect(items[index].props().short_name).toBe(mockGroups[index].short_name);
    expect(items[index].props().long_name).toBe(mockGroups[index].long_name);
  }
});
it("should have to show more detail ", function() {
  expect(wrapper.find(Edit).length).toBe(mockGroups.length);
});
it("should have to delete more detail ", function() {
  expect(wrapper.find(Remove).length).toBe(mockGroups.length);
});
