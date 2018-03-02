import React from 'react'
import PropTypes from 'prop-types'
import {  Paper, Button ,Grid} from 'material-ui';
import Field from '../Field';
import DocBody from '../DocBody';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import { Link } from 'react-router-dom';
import {docStore} from '../../stores/DocStore';
import { observer } from 'mobx-react';

const style={paddingTop:'40px',
  paddingLeft:'40px',
  paddingRight:'40px',
  paddingBottom: '40px'}
const  DocEditor =observer(({ match})=>{
  const id=match.params.id 
  const doc=docStore.getDoc(id);
  return (
    <div>
      <Paper>
        <Grid container space={24} style={style} >
          <DocHeader 
            date={doc.date} 
            onDateChange={ (e)=>docStore.changeDocField(id,'date',e.target.value) } 
          />
          <DocBody doc={doc}  />
          <DocFooter address={doc.address}  />
        </Grid>
      </Paper>
      <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
        Volver
      </Button>
      <Field onChange={(e)=>docStore.changeDocField(id,'cc',e.target.value)} name="CC" 
        type="text" value={doc.cc} validState={()=> true} />
          <Grid item >
            <Field onChange={ (e)=>docStore.changeDocField(id,'name',e.target.value) } name="Nombre" 
              type="text"  value={doc.name} validState={()=> true} />
          </Grid>
    </div>
  )
})
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
