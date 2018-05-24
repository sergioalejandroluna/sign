import React from 'react';
import {shallow} from 'enzyme';
import db from '../db.js'
import {ChooseAccount} from './DocDialogs'
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
const data=db()
const wrapper= shallow(<ChooseAccount  open={true}  handleClose={()=>{}} handleSelect={()=>{}} users={data.users}   />);
it('should have Dialog', function() {
  expect(wrapper.find(Dialog).length).toBe(1);
});
it('should have a list with n items and avatar', function() {
  expect(wrapper.find(Avatar).length).toBe(data.users.length);
});
