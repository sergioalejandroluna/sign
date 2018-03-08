import React from 'react'
import PropTypes from 'prop-types'
import {  Paper, Button ,Grid} from 'material-ui';
import DocBody from '../DocBody';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import { Link } from 'react-router-dom';
import DocStore from '../../stores/DocStore';
import { observer } from 'mobx-react';

const style={paddingTop:'40px',
  paddingLeft:'40px',
  paddingRight:'40px',
  paddingBottom: '40px'}
class  DocEditor extends React.Component{
  state={doc:{},isLoaded:false}
  componentDidMount(){
    const id=this.props.match.params.id 
    DocStore.getDoc(id).then(r=>{
      this.setState({doc:r.data,isLoaded:true})
    });
  }
  render(){
    return (
      <div>
        <Paper>
          {this.renderDoc()}
        </Paper>
        <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
          Volver
        </Button>
      </div>
    )
  }

  renderDoc(){
    if (this.state.isLoaded){
      const doc=this.state.doc;
      return (
        <Grid container space={24} style={style} >
          <DocHeader 
            date={doc.date} 
            onDateChange={ (e)=>this.changeDocField('date',e.target.value) } 
            onNameChange={ (e)=>this.changeDocField('folio',e.target.value)}
            name={doc.folio}
            to={doc.to}
          />
          <DocBody doc={doc}  />
          <DocFooter address={doc.address}  />
        </Grid>
      )
    }
    else
      return (<span>Cargando...</span>);
  }
  changeDocField=(field,value)=>{
    let doc=this.state.doc
    doc[field]=value
    this.setState({doc:doc})
  }
}
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
