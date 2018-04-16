import React from 'react';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import {shallow} from 'enzyme';
import DocActionButtons from '../DocActionButtons';
import DocEditor from './DocEditor';
import Field  from '../Field';
import DocBody from '../DocBody'
import db from '../../db.js'
const data=db()
const mockDocs=data.docs
let onChange=()=>{}
let onCancel=()=>{}
const wrapper= shallow(<DocEditor  match={{params:{id:2}}}  disabled={false}  />);
wrapper.setState({doc:mockDocs[1],isLoaded:true,current_user: data.users[3]})
it('should have a body', function() {
  expect(wrapper.find(DocBody).length).toBe(1);
});
it('should have a Header', function() {
  expect(wrapper.find(DocHeader).length).toBe(1);
});
it('should have a Footer', function() {
  expect(wrapper.find(DocFooter).length).toBe(1);
});
it('should have action buttons', function() {
  expect(wrapper.find(DocActionButtons).length).toBe(1);
});
