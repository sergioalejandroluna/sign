import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import Button from 'material-ui/Button';
import Field from './Field';
import DocBody from '../components/DocBody';
import { Link } from 'react-router-dom';
import {docStore} from '../stores/DocStore';
import { observer } from 'mobx-react';

const  DocEditor =observer(({ match})=>{
  const id=match.params.id 
  const doc=docStore.getDoc(id);
  return (
    <form>
      <Field onChange={(e)=>docStore.changeDocField(id,'name',e.target.value)} name="Nombre" 
        type="text"  value={doc.name} validState={()=> true} />
      <Field onChange={(e)=>docStore.changeDocField(id,'cc',e.target.value)} name="CC" 
        type="text" value={doc.cc} validState={()=> true} />
      <DocBody doc={doc}  />
      <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
        Volver
      </Button>
    </form>
  )
})
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
