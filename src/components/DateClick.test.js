import React from 'react';
import {shallow} from 'enzyme';
import DateClick  from './DateClick'
import { TextField,Button } from 'material-ui';
const dateOpt={  year: 'numeric', month: 'long', day: 'numeric' };
var value='1988-10-05'
const beforeText= "Parral, Chih.,"
const  mxDateString=()=>{
  let event=new Date(Date.parse(value+" 00:00"))
  return event.toLocaleDateString('es-MX', dateOpt)
}

const  finalText=()=>{
  return  beforeText+mxDateString()
}
const change=e=>{
  value=e.target.value
}

const wrapper= shallow(<DateClick value={value} onChange={change} beforeText={beforeText}  />)
it('should have a date text by default', function() {
  expect(wrapper.find(TextField).props().value).toBe(finalText());
});
it('should  let edit the date when click ', function() {
  wrapper.find(TextField).simulate('click')
  wrapper.update();
  expect(wrapper.find(TextField).props().value).toBe(value);
});
