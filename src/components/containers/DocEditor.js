import React from 'react'
import PropTypes from 'prop-types'
import {  Paper, Button ,Grid} from 'material-ui';
import DocBody from '../DocBody';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import { Link } from 'react-router-dom';
import DocStore from '../../stores/DocStore';
import { debounce } from 'lodash'

const style={paddingTop:'40px',
  padding:'40px',
  margin: '0px',
  width: 'auto'}
class  DocEditor extends React.Component{
  state={doc:{},isLoaded:false}
  componentDidMount(){
    const id=this.props.match.params.id 
    DocStore.getDoc(id).then(r=>{
      this.setState({doc:r.data,isLoaded:true})
    });
  }

  save=debounce(()=>{
    const doc=this.state.doc
    DocStore.save(doc).then(r=>{
      this.setState({id:r.data.id})
    })

  },500)

  render(){
    return (
      <Paper>
        {this.renderDoc()}
      </Paper>
    )
  }

  renderDoc(){
    if (this.state.isLoaded){
      const doc=this.state.doc;
      return (
        <Grid container  style={style} >
          <DocHeader 
            onDateChange={ (e)=>this.changeDocField('date',e.target.value) } 
            onFolioChange={ (e)=>this.changeDocField('folio',e.target.value)}
            doc={doc}
            onToChange={ this.onToChange}
          />
          <DocBody doc={doc} onChange={ this.changeDocField } />
          <DocFooter address={doc.address} from={doc.from}  />
          <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
            Volver
          </Button>
        </Grid>
      )
    }
    else
      return (
        <Grid container space={24} style={style} />
      );
  }
  changeDocField=(field,value)=>{
    this.setState((prevState)=>{
      prevState.doc[field]=value
      return prevState
    })
    this.save()
  }
  onToChange=(to)=>{
    this.setState((prevState)=>{
      prevState.doc.to=to
      return prevState
    })
    this.save()
  }
}
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
