import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
const DocTable=({docs,onNew,onEdit,onDelete})=>{
  return (
    <Table>
        <TableHead>
          <TableRow>
            <TableCell> <Button  component={Link} to={'/folio'} onClick={onNew} color="primary"> Nuevo </Button> </TableCell>
            <TableCell numeric>Nombre</TableCell>
            <TableCell numeric>CC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs.map(d => {
            return (
              <TableRow key={d.id}>
                <TableCell> 
                  <Button component={Link} to={'/folio/'+d.id}  onClick={()=>onEdit(d)} color="primary"> Editar </Button>
                  <Button onClick={()=>onDelete(d)} color="secondary" > Borrar </Button>
              </TableCell>
                <TableCell numeric>{d.name}</TableCell>
                <TableCell numeric>{d.cc}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  )
}
DocTable.propTypes={
  docs: PropTypes.array.isRequired,
  onNew: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
export default DocTable;
