import React from 'react';
import {render,shallow} from 'enzyme';
import DocEditor from './DocEditor';
import initialState  from './initialState';
import Field  from './component/Field';
import { Editor } from 'slate-react'
import { Button } from 'react-bootstrap';
const mockDocs=initialState.docs;
let onChange=()=>{}
let onCancel=()=>{}
const wrapper= shallow(<DocEditor doc={mockDocs[1]} onChange={onChange} onCancel={onCancel}  />);
it('should have 2 Fields', function() {
  expect(wrapper.find(Field).length).toBe(2);
});
it('should have a body', function() {
  expect(wrapper.find(Editor).length).toBe(1);
});
it('should have a Header', function() {
  expect(wrapper.find('#header').length).toBe(1);
});
it('should have a Footer', function() {
  expect(wrapper.find('#footer').length).toBe(1);
});
it('should have a back button', function() {
  expect(wrapper.find(Button).length).toBe(1);
});

