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

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isLoaded) return true;
    const nextBodDiff=this.state.doc.body.valid!==nextState.doc.body.valid
    return  this.state.doc.date!==nextState.doc.date || this.state.snack!==nextState.snack ||
      this.state.doc.folio!==nextState.doc.folio || this.state.doc.from.id!==nextState.doc.from.id || 
      this.state.doc.to.id!==nextState.doc.to.id ||  nextBodDiff
  }


  save=debounce(()=>{
    const doc=this.state.doc
    DocStore.save(doc).then(r=>{
      this.setState((prevState)=>{
        const newState={...prevState}
        newState.doc.id=r.data.id
        return newState;
      })
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
    if (!this.state.isLoaded)
      return (
        <Grid container space={24} style={style} />
      );
    const doc=this.state.doc;
    const disabled= this.state.doc.sent || this.state.doc.signed
    const canSend=doc.created_by.id===doc.from.id
    // you shall not send empty body documents 
    const disableSend= !this.state.doc.body.valid || disabled

    return (
      <Grid container  style={style} >
        <DocHeader 
          onDateChange={ (e)=>this.changeDocField('date',e.target.value) } 
          onFolioChange={ (e)=>this.changeDocField('folio',e.target.value)}
          date={doc.date}
          folio={doc.folio}
          to={doc.to}
          onToChange={ this.onToChange}
          disabled={disabled}
        />
        <DocBody doc={doc} onChange={ this.onBodyChange } disabled={disabled} />
        <DocFooter address={doc.address} from={doc.from} created_by={doc.created_by}
          onSwitchFrom={this.onSwitchFrom} disabled={disabled} />
        <DocActionButtons onSend={this.onSend} disabled={disableSend} 
          showSend={canSend}  />
        <Snackbar
          open={this.state.snack}
          message="Folio enviado con exito"
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          onClose={()=>{ this.setState({snack: false}) }}
        />
      </Grid>
    )
  }

  
  onToChange=(value)=>{
    this.setState((prevState)=>{
      const newState={...prevState, doc: { ...prevState.doc, to: {...value} } }
      return newState
    })
    this.save()
  }

  onBodyChange=(value)=>{
    this.setState((prevState)=>{
      const newState={...prevState, doc: { ...prevState.doc } }
      newState.doc.body=value
      newState.doc.body.valid= value.document.text.length>50 
      return newState
    })
    this.save()
  }

  changeDocField=(field,value)=>{
    this.setState((prevState)=>{
      const newState={...prevState, doc: { ...prevState.doc } }
      newState.doc[field]=value
      return newState
    })
    this.save()
  }

  onSwitchFrom=(user)=>{
    this.setState((prevState)=>{
      const newState={...prevState, doc: { ...prevState.doc } }
      newState.doc.from=user
      newState.doc.address=user.address
      return newState
    })
    this.save()
  }

  onSend=()=>{
    const doc= this.state.doc
    DocStore.send_or_sign(doc).then((r)=>{
      this.setState((prevState)=>{
        const newState={...prevState}
        newState.doc.sent=r.data.sent
        newState.doc.signed=r.data.signed
        newState.snack=true
        return newState
      })

    })
  }
}
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
