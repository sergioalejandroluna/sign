import React from 'react';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import {shallow} from 'enzyme';
import DocEditor from './DocEditor';
import Field  from '../Field';
import DocBody from '../DocBody'
import Button from 'material-ui/Button';
import db from '../../db.js'
const mockDocs=db().docs;
let onChange=()=>{}
let onCancel=()=>{}
const wrapper= shallow(<DocEditor  match={{params:{id:2}}}    />);
wrapper.setState({doc:mockDocs[1],isLoaded:true})
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

