import React from 'react';
import PropTypes from 'prop-types';
import {render,shallow,mount} from 'enzyme';
import DocTable  from './DocTable'
import ReactTable from 'react-table'
const mockDocs=[
    {id:1, name: 'Folio feo', cc: 'email@importante' },
    {id:2, name: 'Folio bonito', cc: 'email@aburrido' },
    {id:3, name: 'Folio x', cc: 'email@x' },
    {id:4, name: 'Folio raro', cc: 'email@raro' },
  ]
  const mockOnEdit=()=>{}
  const mockOnNew=()=>{}
  const onDelete=()=>{}
it('should render a React table', function() {
  const wrapper= shallow(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}  />)
  expect(wrapper.find(ReactTable).length).toBe(1);
});
it('should render a new link', function() {
  const wrapper= render(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}/>)
  expect(wrapper.find('.add_new').length).toBe(1);
});
it('should render  some edit links', function() {
  const wrapper= render(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}/>)
  expect(wrapper.find('.edit').length).toBe(mockDocs.length)
});
it('should render  some delete links', function() {
  const wrapper= render(<DocTable docs={mockDocs} onEdit={mockOnEdit} onNew={mockOnNew} onDelete={onDelete}/>)
  expect(wrapper.find('.delete').length).toBe(mockDocs.length);
});
