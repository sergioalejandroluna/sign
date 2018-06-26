import React from 'react'
import SearchBar from './SearchBar'
import {render, shallow} from 'enzyme';
import Input from '@material-ui/core/Input'
import { withRouter } from 'react-router-dom'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

const wrapper= render(withRouter(<SearchBar />));

it('should have an Input field', function() {
  expect(wrapper.find(Input));
})
it('should have an clear icon', function() {
  expect(wrapper.find(ClearIcon));
})
it('should have an search icon', function() {
  expect(wrapper.find(SearchIcon));
})