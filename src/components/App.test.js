import React from 'react';
import Layout from '../components/Layout';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { Route, Switch  } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have the layout', function() {
  const wrapper= shallow(<App />);
  expect(wrapper.find(Layout).length).toBe(1);
});
it('should have 3 routes', function() {
  const wrapper= shallow(<App />);
  expect(wrapper.find(Route).length).toBe(3);
});
