import React from 'react';
import {shallow} from 'enzyme';
import Delegate from './Delegate';
import DelegateStore from '../../stores/DelegateStore'
import db from '../../db.js'
import SearchUserField from '../SearchUserField'
import { ListItem }  from '@material-ui/core/List';
import { AddCircle, RemoveCircle } from '@material-ui/core-icons';
const data=db()
DelegateStore.add=function(){
  return new Promise((resolve,reject)=>{
    resolve({data: data.users });
  })
}
DelegateStore.remove=function(){
  return new Promise((resolve,reject)=>{
    resolve(true);
  })
}
DelegateStore.list=function(){
  return new Promise((resolve,reject)=>{
    resolve({data: data.users });
  })
}

const wrapper= shallow(<Delegate   />);
wrapper.setState({
    users: data.users
});
it('should have a search field', function() {
  expect(wrapper.find(SearchUserField).length).toBe(1);
});
it('should have a list of assigned users', function() {
  expect(wrapper.find(ListItem).length).toBe(data.users.length);
});
it('should have an add button', function() {
  expect(wrapper.find(AddCircle).length).toBe(1);
});
it('should have some remove buttons', function() {
  expect(wrapper.find(RemoveCircle).length).toBe(data.users.length);
});
