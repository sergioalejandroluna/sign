import React from 'react';
import DocHeader from './DocHeader';
import DocFooter from './DocFooter';
import {render,shallow} from 'enzyme';
import DocEditor from './DocEditor';
import initialState  from '../stores/initialState';
import Field  from '../containers/Field';
import DocBody from '../components/DocBody'
import Button from 'material-ui/Button';
const mockDocs=initialState.docs;
let onChange=()=>{}
let onCancel=()=>{}
const wrapper= shallow(<DocEditor doc={mockDocs[1]} match={{params:{id:2}}}    />);
it('should have a body', function() {
  expect(wrapper.find(DocBody).length).toBe(1);
});
it('should have a Header', function() {
  expect(wrapper.find(DocHeader).length).toBe(1);
});
it('should have a Footer', function() {
  expect(wrapper.find(DocFooter).length).toBe(1);
});
it('should have a back button', function() {
  expect(wrapper.find(Button).length).toBe(1);
});

