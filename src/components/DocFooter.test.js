import React from 'react'
import DocFooter from './DocFooter'
import {shallow} from 'enzyme';
const address={street:'Calle larga largota #1212',
  colony: 'Centro',
  city:'Chihuahua,Chihuahua',
  zip: '31124'}
const wrapper= shallow(<DocFooter address={address}/>);
it('should have a street', function() {
  expect(wrapper.find('.street').text()).toBe(address.street)
})
it('should have a colony', function() {
  expect(wrapper.find('.colony').text()).toBe(address.colony)
})
it('should have a city', function() {
  expect(wrapper.find('.city').text()).toBe(address.city)
})
it('should have a zip', function() {
  expect(wrapper.find('.zip').text()).toBe(address.zip)
})
