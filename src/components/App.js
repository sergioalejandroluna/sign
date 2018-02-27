import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom';
import DocTable from '../containers/DocTable';
import HomePage from '../containers/HomePage';
import DocEditor from '../containers/DocEditor';
import initialState, {initialDoc} from '../stores/initialState';

class App extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
  }

  render(){
    return(  
      <Switch>
        <Route path="/folios" render={props=> (
          <DocTable 
            {...props}
            docs={this.state.docs}  
            onNew={this.newDoc} 
            onEdit={this.editDoc} 
            onDelete={this.deleteDoc}/> )} />
        <Route path="/folio/:id?" render={props=>(
          <DocEditor 
            {...props}
            doc={this.state.doc} 
            onChange={this.onFieldChange} />)} />
        <Route path="/" component={HomePage}/>
      </Switch>
    )
  }

  newDoc=()=>{
    let init= initialDoc()
    init.id=this.state.docs.length+1
    this.setState({ doc:init, docs:[...this.state.docs,init ] })
  }

  editDoc=(doc)=>{
    this.setState({doc:doc})
  }
  deleteDoc=(doc)=>{
    let docs=[...this.state.docs]
    let foundIndex=docs.findIndex(x=>x.id===doc.id)
    docs.splice(foundIndex,1)
    this.setState({docs:docs })
  }
  onFieldChange=(e,doc,name)=>{
    let docs=[...this.state.docs]
    let foundIndex=docs.findIndex(x=>x.id===doc.id)
    doc[name]=e.target.value;
    docs[foundIndex]=doc
    this.setState({docs:docs })
  }

}

export default App;
