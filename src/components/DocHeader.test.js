import React from 'react'
import DocHeader from './DocHeader'
import {shallow} from 'enzyme';
import DateClick from './DateClick.js';
import logo from '../logo.svg';
import { TextField } from 'material-ui';
import { List} from 'material-ui';
const date="1999-12-12"
const name="Folio de prueba"
const to={
    id: 3,
    name:{
      title: 'QBP',
      full: 'Walter White'
    },
    job_title: 'Profesor de quimica',
    institution: 'Supervisor pollos hermanos',
    username: 'walterwhite',
    email: 'walterwithe@bluemeth.com',
  }
const wrapper= shallow(<DocHeader to={to} name={name}  date={date} onDateChange={e=> console.log(e)}
 onDateChange={e=> console.log(e)}  
/>);
it('should have a logo', function() {
  expect(wrapper.find('img').props().src).toBe(logo)
})
it('should have a date', function() {
  expect(wrapper.find(DateClick).props().value).toBe(date)
})
it('should have a doc name', function() {
  expect(wrapper.find(TextField).props().value).toBe(name)
})
it('should have a Greeting', function() {
  expect(wrapper.find(List).length).toBe(1)
})
