import React from 'react';
import PropTypes from 'prop-types';
import {render,shallow,mount} from 'enzyme';
import DocTable  from './DocTable'
import Table  from 'material-ui/Table';
import Button from 'material-ui/Button';
import db from '../../db.js'
const wrapper= shallow(<DocTable   />)
wrapper.setState({docs:db().docs,isLoaded:true});
console.log(wrapper)
it('should render a  table', function() {
  expect(wrapper.find(Table).length).toBe(1);
});
// 2 by row and 1 for the new action
it('should render a (2*n)+1 buttons ', function() {
  expect(wrapper.find(Button).length).toBe((mockDocs.length*2)+1);
});
