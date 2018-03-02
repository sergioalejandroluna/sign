import React from 'react';
import PropTypes from 'prop-types';
import {render,shallow,mount} from 'enzyme';
import DocTable  from './DocTable'
import Table  from 'material-ui/Table';
import Button from 'material-ui/Button';
const mockDocs=[
    {id:1, name: 'Folio feo', cc: 'email@importante' },
    {id:2, name: 'Folio bonito', cc: 'email@aburrido' },
    {id:3, name: 'Folio x', cc: 'email@x' },
    {id:4, name: 'Folio raro', cc: 'email@raro' },
  ]
  const mockOnEdit=()=>{}
  const mockOnNew=()=>{}
  const onDelete=()=>{}
it('should render a  table', function() {
  const wrapper= shallow(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}  />)
  expect(wrapper.find(Table).length).toBe(1);
});
// 2 by row and 1 for the new action
it('should render a (2*n)+1 buttons ', function() {
  const wrapper= shallow(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}/>)
  expect(wrapper.find(Button).length).toBe((mockDocs.length*2)+1);
});
