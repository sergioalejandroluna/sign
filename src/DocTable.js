import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import Button from 'material-ui/Button';

const DocTable=({docs,onNew,onEdit,onDelete})=>{
  const columns=[
    {Header:'Nombre', accessor:'name'},
    {Header:'CC', accessor:'cc'},
    {Header:'Acciones', accessor:'id', 
      Cell: row=> (
        <div>
          <Button  className="edit" variant='raised' onClick={()=> onEdit(row.original) } >
            Editar
        </Button>
        <Button  className="delete" variant='raised' onClick={()=> onDelete(row.original) } >
          Borrar
        </Button>
        </div>)
    }
  ]
  
  return (
    <div>
      <ReactTable data={docs} columns={columns} defaultPageSize={ 5 } showPageSizeOptions={false}/>
      <Button  variant='raised' color='primary' className="add_new" onClick={onNew} >
        Nuevo
      </Button>
    </div>
  )
}
DocTable.propTypes={
  docs: PropTypes.array.isRequired,
  onNew: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
export default DocTable;
