import React from 'react';
import {shallow} from 'enzyme';
import DateClick  from './DateClick'
const wrapper= shallow(<DateClick />)
it('should have a date input ', function() {
  expect(wrapper.find('input').length).toBe(1);
});
it('should have a date text', function() {
  expect(wrapper.find('span').length).toBe(1);
});
it('should have a button ', function() {
  expect(wrapper.find('button').length).toBe(1);
});
it('should have let edit the date when click ', function() {
  expect(wrapper.find('date').length).toBe(1);
});
