import React from 'react'
import SearchUserField from './SearchUserField'
import {mount} from 'enzyme';
import Autosuggest from 'react-autosuggest';
import db from '../db.js'
const user=db().users[3]
const wrapper= mount(<SearchUserField   to={user} onChange={e=> console.log(e)}
  
/>);
it('should have A suggest field', function() {
  expect(wrapper.find(Autosuggest).length).toBe(1)
})
