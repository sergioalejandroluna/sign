import React from 'react'
import {Grid, IconButton } from '@material-ui/core';
import  DocFooter,{ Sign } from './DocFooter'
import {shallow} from 'enzyme';
import db from '../db'
import DelegateStore from "../stores/DelegateStore"
import {ChooseAccount} from './DocDialogs';
const data=db()
const address=data.addresses[1]
const from=data.users[1]
const created_by=data.users[2]
DelegateStore.getUsersOnBehalf=()=>{
  return new Promise((resolve,reject)=>{
    resolve({data: data.users });
  })
}
const onSwitchFrom=()=>{}
const wrapper= shallow(<DocFooter address={address} from={from} created_by={created_by} onSwitchFrom={onSwitchFrom} disabled={false} showSign={true}/>);
it('should have a  signature', function() {
  expect(wrapper.find(Sign).length).toBe(1)
})
it('should have a name of the sender', function() {
  expect(wrapper.find(Grid).get(5).props.children[0]).toBe(from.name.title+' '+from.name.full)
})
it('should have a switch account button', function() {
  wrapper.setState({users:data.users })
  expect(wrapper.find(IconButton).length).toBe(1)
})
it('should have a dialog to change account', function() {
  expect(wrapper.find(ChooseAccount).length).toBe(1)
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
  expect(wrapper.find(Grid).get(14).props.children[3]).toBe(address.city)
})
it('should have a zip code', function() {
  expect(wrapper.find(Grid).get(14).props.children[1]).toBe(address.zip)
})
it('should have telephone number', function() {
  expect(wrapper.find(Grid).get(15).props.children[1]).toBe(address.telephone.number)
})
it('should have telephone ext', function() {
  expect(wrapper.find(Grid).get(16).props.children[1]).toBe(address.telephone.ext)
})
it('should have an from email ', function() {
  expect(wrapper.find(Grid).get(8).props.children).toBe(from.email)
})
it('should have a created by email ', function() {
  expect(wrapper.find(Grid).get(19).props.children).toBe(created_by.email)
})
it('should hide a created by email when the from an create by are the same ', function() {
  wrapper.setProps({from: from, created_by: from })
  expect(wrapper.find(Grid).get(17)).toBe(null)
})
it('should hide switch user button when it does not have users ', function() {
  wrapper.setState({users:[] })
  expect(wrapper.find(IconButton).length).toBe(0)
})
