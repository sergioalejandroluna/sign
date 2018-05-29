import React from 'react';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import {shallow} from 'enzyme';
import DocActionButtons from '../DocActionButtons';
import DocEditor from './DocEditor';
import Field  from '../Field';
import DocBody from '../DocBody'
import db from '../../db.js'
import DocStore from '../../stores/DocStore';
const data=db()
const mockDoc=data.docs[1]
mockDoc.to= data.users[1]
mockDoc.from= data.users[0]
mockDoc.created_by= data.users[2]
mockDoc.address=data.addresses[1]
mockDoc.sent=false
mockDoc.signed=false
let onChange=()=>{}
let onCancel=()=>{}
DocStore.getDoc=(id)=>{
  return new Promise((resolve)=>{
    resolve({data: mockDoc })
  })
}
const wrapper= shallow(<DocEditor  match={{params:{id:2}}} history={{goBack:()=>{}}}  disabled={false}  />);
wrapper.setState({doc:mockDoc,isLoaded:true,current_user: data.users[3]})
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
