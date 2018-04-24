import React from 'react'
import PropTypes from 'prop-types'
import {  Paper, Grid, Snackbar} from 'material-ui';
import DocBody from '../DocBody';
import DocHeader from '../DocHeader';
import DocFooter from '../DocFooter';
import DocActionButtons from '../DocActionButtons';
import DocStore from '../../stores/DocStore';
import { debounce } from 'lodash'

const style={paddingTop:'40px',
  padding:'40px',
  margin: '0px',
  width: 'auto'}
class  DocEditor extends React.Component{
  state={doc:{},isLoaded:false,
    snack: false,
  }
  componentDidMount(){
    const id=this.props.match.params.id 
    DocStore.getDoc(id).then(r=>{
      this.setState({doc:r.data,isLoaded:true})
    });
  }

  save=debounce(()=>{
    const doc=this.state.doc
    DocStore.save(doc).then(r=>{
      doc.id=r.data.id
      this.setState({doc: doc})
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
      const disabled=this.state.doc.sent

      return (
        <Grid container  style={style} >
          <DocHeader 
            onDateChange={ (e)=>this.changeDocField('date',e.target.value) } 
            onFolioChange={ (e)=>this.changeDocField('folio',e.target.value)}
            doc={doc}
            onToChange={ this.onToChange}
            disabled={disabled}
          />
          <DocBody doc={doc} onChange={ this.changeDocField } disabled={disabled} />
          <DocFooter address={doc.address} from={doc.from} created_by={doc.created_by}
            onSwitchFrom={this.onSwitchFrom} disabled={disabled} />
          <DocActionButtons onSend={this.onSend} disableSend={this.disableSend}  />
          <Snackbar
            open={this.state.snack}
            message="Folio enviado con exito"
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            onClose={()=>{ this.setState({snack: false}) }}
          />
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

  onSwitchFrom=(user)=>{
      this.setState((prevState)=>{
        prevState.doc.from=user
        return prevState
      })
    this.save()
  }

  // you shall not send empty body documents 
  disableSend=()=>{
    const doc= this.state.doc.body.document
    return !(doc.text!==undefined && this.state.doc.sent===false && doc.text.length>0)
  }

  onSend=()=>{
    const doc= this.state.doc
    DocStore.send(doc).then(()=>{
      this.setState((prevState)=>{
        prevState.doc.sent=true
        prevState.snack=true
        return prevState
      })

    })
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
