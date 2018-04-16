import React from 'react'
import DocHeader from './DocHeader'
import {shallow} from 'enzyme';
import DateClick from './DateClick.js';
import { Logo } from '../img';
import { TextField } from 'material-ui';
import SearchUserField from './SearchUserField'
import db from '../db.js'
const doc=db().docs[1]
const wrapper= shallow(<DocHeader   doc={doc} onFolioChange={e=> console.log(e)}
 onToChange={e=> console.log(e)}  
 onDateChange={e=> console.log(e)}  
 disabled={false}
/>);
it('should have a logo', function() {
  expect(wrapper.find('img').props().src).toBe(Logo)
})
it('should have a date', function() {
  expect(wrapper.find(DateClick).props().value).toBe(doc.date)
})
it('should have a doc name', function() {
  expect(wrapper.find(TextField).props().value).toBe(doc.folio)
})
it('should have a Greeting', function() {
  expect(wrapper.find(SearchUserField).props().to).toBe(doc.to)
})
