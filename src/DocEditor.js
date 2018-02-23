import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import Button from 'material-ui/Button';
import Field from './component/Field';
import DocBody from './DocBody';



const  DocEditor =({ doc,onChange,onCancel })=>{

    return (
      <form>
        <Field onChange={(e)=>onChange(e,doc,'name')} name="Nombre" 
          type="text"  value={doc.name} validState={()=> true} />
        <Field onChange={(e)=>onChange(e,doc,'cc')} name="CC" 
          type="text" value={doc.cc} validState={()=> true} />
        <DocBody onChange={onChange} doc={doc}  />
        <Button variant='raised' color='primary' className="back" onClick={onCancel} >
          Volver
        </Button>
      </form>
    )
}
DocEditor.propTypes={
  doc: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}
export default DocEditor;
