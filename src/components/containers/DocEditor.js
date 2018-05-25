import React from 'react'
import PropTypes from 'prop-types'
import {  Paper, Grid, Snackbar} from '@material-ui/core';
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
      this.addWSCheckReaded(r.data)
    },e=>{
      switch( e.response.status){
        case 403:
          this.setState({error: 'Acceso denegado'});
          break;
        case 404:
          this.setState({error: 'No encontrado'});
          break;
        default:
          this.setState({error: 'Error '})
          console.error(e.message)
      }
    });
  }

  componentWillUnmount(){
    if (this.subs!==undefined){
      this.subs.unsubscribe();
    }
  }

  addWSCheckReaded=(doc)=>{
    if(!doc.readed && doc.sent && this.subs===undefined)
      this.subs=DocStore.getReadedChannel(doc.id, (data)=>{
        this.setState((prevState)=>{
          const newState={...prevState}
          newState.doc={...prevState.doc}
          newState.doc.readed=data
          return newState;
        })
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isLoaded) return true;
    const nextBodDiff=this.state.doc.body.valid!==nextState.doc.body.valid
    return  this.state.doc.date!==nextState.doc.date || this.state.snack!==nextState.snack ||
      this.state.doc.folio!==nextState.doc.folio || this.state.doc.from.id!==nextState.doc.from.id || 
      this.state.doc.to.id!==nextState.doc.to.id || this.state.doc.readed!==nextState.doc.readed || nextBodDiff
  }


  save=debounce(()=>{
    const doc=this.state.doc
    DocStore.save(doc).then(r=>{
      this.setState((prevState)=>{
        const newState={...prevState}
        newState.doc={...prevState.doc}
        newState.doc.id=r.data.id
        newState.doc.folio=r.data.folio
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
        <div>
          <Grid container space={24} style={style} />
          <Snackbar
            open={this.state.error!==undefined}
            message={this.state.error}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          />
        </div>
      );
    const { doc, snack  }=this.state;
    // you can only send when the current user and the documents from, are the same 
    const canSend=doc.from.email===DocStore.email()
    // disabled when the docs was sent or teh current already requested a sign
    const disabled= doc.sent || (doc.signed && !canSend)
    // you shall not send empty body documents 
    const disableSend= !doc.body.valid || disabled
    // if the docs is to the current users, dont show send button
    const hideSend=doc.to.email===DocStore.email() && doc.sent

    return (
      <Grid container  style={style} >
        <DocHeader 
          onDateChange={ (e)=>this.changeDocField('date',e.target.value) } 
          date={doc.date}
          folio={doc.folio}
          to={doc.to}
          onToChange={ this.onToChange}
          disabled={disabled}
          readed={ !hideSend && doc.readed===true }
        />
        <DocBody doc={doc} onChange={ this.onBodyChange } disabled={disabled} />
        <DocFooter address={doc.address} from={doc.from} created_by={doc.created_by}
          onSwitchFrom={this.onSwitchFrom} 
          disabled={disabled}
          showSign={doc.sent}
        />
        <DocActionButtons onSend={this.onSend} disabled={disableSend} 
          canSend={canSend}
          hideSend={hideSend}
        />
        <Snackbar
          open={snack}
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
        this.addWSCheckReaded(r.data)
        return newState
      })

    })
  }
}
DocEditor.propTypes={
  match: PropTypes.object.isRequired,
}
export default DocEditor;
