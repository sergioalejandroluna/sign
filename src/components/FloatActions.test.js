import React from 'react';
import {shallow} from 'enzyme';
import FloatActions from './FloatActions'
import { Button  } from '@material-ui/core';

const wrapper= shallow(<FloatActions />).dive();

it('should have a back button ', function() {
  expect(wrapper.find(Button).length).toBe(1);
});
