import React from 'react'
import DocFooter from './DocFooter'
import {Grid } from 'material-ui';
import {shallow} from 'enzyme';
import db from '../db'
const data=db()
const address=data.addresses[1]
const from=data.users[1]
const createdBy=data.users[1]
const wrapper= shallow(<DocFooter address={address} from={from} createdBy={createdBy}/>);
it('should have a  signature', function() {
  expect(wrapper.find(Grid).get(4).props.children.props.src).toBe(from.signature)
})
it('should have a name of the sender', function() {
  expect(wrapper.find(Grid).get(5).props.children).toBe(from.name.title+' '+from.name.full)
})
it('should have a job title', function() {
  expect(wrapper.find(Grid).get(6).props.children).toBe(from.job_title)
})
it('should have a institution', function() {
  expect(wrapper.find(Grid).get(7).props.children).toBe(from.institution)
})
it('should have a street', function() {
  expect(wrapper.find(Grid).get(12).props.children).toBe(address.street)
})
it('should have a colony', function() {
  expect(wrapper.find(Grid).get(13).props.children).toBe(address.colony)
})
it('should have a city', function() {
  expect(wrapper.find(Grid).get(14).props.children).toBe(address.city)
})
it('should have a city', function() {
  expect(wrapper.find(Grid).get(15).props.children).toBe(address.zip)
})
it('should have an from email ', function() {
    expect(wrapper.find(Grid).get(8).props.children).toBe(from.email)
})
it('should have a created by email ', function() {
    expect(wrapper.find(Grid).get(17).props.children).toBe(createdBy.email)
})