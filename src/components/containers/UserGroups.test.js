import React from "react";
import { shallow } from "enzyme";
import UserGroups from "./UserGroups";
const data = db();
const mockGroups = data.user_groups;
let wrapper = shallow(<UserGroups />);
it("should have a list with the name of the group", function() {
  expect(false).toBe(true);
});
it("should have a button to add more groups", function() {
  expect(false).toBe(true);
});
it("on click should show a detail of the group", function() {
  expect(false).toBe(true);
});
it("should have a list of size n", function() {
  expect(false).toBe(true);
});
