import React from 'react';
import ReadedCell from './ReadedCell';
import {shallow} from 'enzyme';
import  {TableCell} from '@material-ui/core';
import DocStore from '../stores/DocStore'
import {  Done } from '@material-ui/icons';

DocStore.getReadedChannel=(id, onReaded)=>{
  onReaded=()=>{}
}
const wrapper= shallow(<ReadedCell  readed={true} id={1}  />)
it('should render a  TableCell', function() {
  expect(wrapper.find(TableCell).length).toBe(1);
});
it('should render Done icon when the props is readed', function() {
  wrapper.setProps({readed:true})
  expect(wrapper.find(Done).length).toBe(1);
});
