import React from 'react'
import DocHeader from './DocHeader'
import {render,shallow} from 'enzyme';
import DateClick from './DateClick.js';
import logo from '../logo.png';
import { List} from 'material-ui';
const wrapper= shallow(<DocHeader  date="1999-12-12" onDateChange={e=> console.log(e)}
 onDateChange={e=> console.log(e)}  
/>);
it('should have a logo', function() {
  expect(wrapper.find('img').props().src).toBe(logo)
})
it('should have a date', function() {
  expect(wrapper.find(DateClick).length).toBe(1)
})
it('should have a Greeting', function() {
  expect(wrapper.find(List).length).toBe(1)
})
