import React from 'react'
import DocActionButtons from './DocActionButtons.js'
import {Grid } from 'material-ui';
import {shallow} from 'enzyme';
import Button from 'material-ui/Button';
const wrapper= shallow(<DocActionButtons onSend={()=>{}} disabled={false} showSend={true} />);
it('should have a back button', function() {
  expect(wrapper.find(Button).get(0).props.children).toBe('Volver')
});
it('should have a send button', function() {
  expect(wrapper.find(Button).get(1).props.children).toBe('Enviar')
});
it('should change the text of send button', function() {
  wrapper.setProps({ showSend: false})
  expect(wrapper.find(Button).get(1).props.children).toBe('Solicitar firma' )
});
it('should able to disable the send button', function() {
  wrapper.setProps({disabled:true, showSend: false})
  expect(wrapper.find(Button).get(1).props.disabled).toBe(true)
});

