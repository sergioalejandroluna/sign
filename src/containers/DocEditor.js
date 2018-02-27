import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import Button from 'material-ui/Button';
import Field from './Field';
import DocBody from '../components/DocBody';
import { Link } from 'react-router-dom';



const  DocEditor =({ doc,onChange})=>{

    return (
      <form>
        <Field onChange={(e)=>onChange(e,doc,'name')} name="Nombre" 
          type="text"  value={doc.name} validState={()=> true} />
        <Field onChange={(e)=>onChange(e,doc,'cc')} name="CC" 
          type="text" value={doc.cc} validState={()=> true} />
        <DocBody onChange={onChange} doc={doc}  />
        <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
          Volver
        </Button>
      </form>
    )
}
DocEditor.propTypes={
  doc: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default DocEditor;
