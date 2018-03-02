import React from 'react'
import DocHeader from './DocHeader'
import {render,shallow} from 'enzyme';
import Field from './Field';
import logo from '../logo.png';
const wrapper= shallow(<DocHeader  date="1999-12-12" onDateChange={e=> console.log(e)}
 onDateChange={e=> console.log(e)}  
/>);
it('should have a logo', function() {
  expect(wrapper.find('img').props().src).toBe(logo)
})
it('should have a date', function() {
  expect(wrapper.find(Field).get(1).props.value).toBe('1999-12-12')
})
it('should have a Greeting', function() {
  expect(wrapper.find('greeting').length).toBe(1)
})
