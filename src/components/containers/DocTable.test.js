import React from 'react';
import ReadedCell from '../ReadedCell';
import PropTypes from 'prop-types';
import {render,shallow,mount} from 'enzyme';
import DocTable  from './DocTable'
import { Table, 
  Button,
  TableFooter,

}  from '@material-ui/core';
import db from '../../db.js'
import DocStore from '../../stores/DocStore';
const mockDocs=db().docs
DocStore.fetch=()=>{
  return new Promise((resolve)=>{
    resolve({data: {docs: mockDocs, total: 10} })
  })
}
DocStore.getInboxChannel=(newMessage)=>{
  newMessage=()=>{
  }
}
const wrapper= shallow(<DocTable  fetch='inbox' />)
it('should render a  table', function() {
  expect(wrapper.find(Table).length).toBe(1);
});
it('should render table footer ', function() {
  expect(wrapper.find(TableFooter).length).toBe(1);
});
it('it should have  table footer ', function() {
  expect(wrapper.find(TableFooter).length).toBe(1);
});
it('it should have  delete button when is draft ', function() {
  wrapper.setProps({fetch: 'draft'})
  const labels=wrapper.find(Button).map(r=>{
    return r.props().children.trim()
  })
  expect(labels).toEqual(expect.arrayContaining(['Borrar']))
});
it('it should NOT have  delete button when is NOT draft ', function() {
  const getLabels=(r)=>{
    return r.props().children.trim()
  }
  let labels=[]
  wrapper.setProps({fetch: 'inbox'})
  labels=labels.concat(wrapper.find(Button).map(getLabels))
  wrapper.setProps({fetch: 'sent'})
  labels=labels.concat(wrapper.find(Button).map(getLabels))
  wrapper.setProps({fetch: 'signed'})
  labels=labels.concat(wrapper.find(Button).map(getLabels))
  expect(labels).not.toEqual(expect.arrayContaining(['Borrar']))
});
it('it should have  readed column when is sent  ', function() {
  wrapper.setProps({fetch: 'sent'})
  expect(wrapper.find(ReadedCell).length>0).toBe(true);
});
