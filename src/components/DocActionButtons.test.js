import React from 'react'
import DocActionButtons from './DocActionButtons.js'
import {Grid } from '@material-ui/core';
import {shallow} from 'enzyme';
import Button from '@material-ui/core/Button';
const wrapper= shallow(<DocActionButtons onSend={()=>{}} disabled={false} canSend={true} hideSend={false} goBack={()=>{}} />);
it('should have a back button', function() {
  expect(wrapper.find(Button).get(0).props.children).toBe('Volver')
});
it('should have a send button', function() {
  expect(wrapper.find(Button).get(1).props.children).toBe('Firmar y enviar')
});
it('should change the text of send button', function() {
  wrapper.setProps({ canSend: false})
  expect(wrapper.find(Button).get(1).props.children).toBe('Solicitar firma' )
});
it('should able to disable the send button', function() {
  wrapper.setProps({disabled:true, canSend: false})
  expect(wrapper.find(Button).get(1).props.disabled).toBe(true)
});

