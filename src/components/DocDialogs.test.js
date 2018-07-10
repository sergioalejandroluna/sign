import React from "react";
import { shallow } from "enzyme";
import db from "../db.js";
import { ChooseAccount, ReadDetailDialog } from "./DocDialogs";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import { Done, DoneAll } from "@material-ui/icons";
const data = db();
const wrapperAccout = shallow(
  <ChooseAccount
    open={true}
    handleClose={() => {}}
    handleSelect={() => {}}
    users={data.users}
  />
);
it("should have Dialog", function() {
  expect(wrapperAccout.find(Dialog).length).toBe(1);
});
it("should have a list with n items and avatar", function() {
  expect(wrapperAccout.find(Avatar).length).toBe(data.users.length);
});

const mockDetail = [];
mockDetail.push({ read: false, to: data.users[0] });
mockDetail.push({ read: false, to: data.users[1] });
mockDetail.push({ read: true, to: data.users[2] });
const wrapperRead = shallow(
  <ReadDetailDialog open={true} onClose={() => {}} detail={mockDetail} />
);
it("should have Dialog", function() {
  expect(wrapperRead.find(Dialog).length).toBe(1);
});
it("should have a list with n items and avatar", function() {
  expect(wrapperRead.find(Avatar).length).toBe(mockDetail.length);
});
it("should have 2 Done icons", function() {
  expect(wrapperRead.find(Done).length).toBe(2);
});
it("should have 1 DoneAll icons", function() {
  expect(wrapperRead.find(DoneAll).length).toBe(1);
});
