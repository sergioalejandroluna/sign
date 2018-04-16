import React from 'react'
import DocActionButtons from './DocActionButtons.js'
import {Grid } from 'material-ui';
import {shallow} from 'enzyme';
import Button from 'material-ui/Button';
let wrapper= shallow(<DocActionButtons onSend={()=>{}} disableSend={()=>{return false}} />);
it('should have a back button', function() {
  expect(wrapper.find(Button).get(0).props.children).toBe('Volver')
});
it('should have a send button', function() {
  expect(wrapper.find(Button).get(1).props.children).toBe('Enviar')
});
it('should able to disable the send button', function() {
  let wrapper= shallow(<DocActionButtons onSend={()=>{}} disableSend={()=>{return true}} />);
  expect(wrapper.find(Button).get(1).props.disabled).toBe(true)
});

