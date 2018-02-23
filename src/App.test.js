import React from 'react';
import DocTable from './DocTable';
import DocEditor from './DocEditor';
import ReactDOM from 'react-dom';
import {render,shallow,mount} from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have a a table by default', function() {
  const wrapper= shallow(<App />);
  expect(wrapper.find(DocTable).length).toBe(1);
});
it('should  delete docs', function() {
  const wrapper= mount(<App />);
  const initialDocs=[ ...wrapper.state('docs') ];
  wrapper.find('button.delete').hostNodes().last().simulate('click');
  const endDocs=wrapper.state('docs');
  initialDocs.pop();
  expect(endDocs).toEqual(initialDocs);
});
