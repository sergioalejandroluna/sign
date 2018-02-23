import React, { Component } from 'react';
import DocTable from './DocTable';
import DocEditor from './DocEditor';
import initialState, {initialDoc} from './initialState';

class App extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
  }

  render() {
    if (this.state.doc===-1)
      return (<DocTable docs={this.state.docs}  onNew={this.newDoc} onEdit={this.editDoc} onDelete={this.deleteDoc} />);
    else
      return (<DocEditor doc={this.state.doc} onCancel={this.onCancel} onChange={this.onFieldChange} />);
  }
  newDoc=()=>{
    this.setState({ doc:initialDoc })
  }

  editDoc=(doc)=>{
    this.setState({doc:doc})
  }
  onCancel=()=>{
    this.setState({doc:-1})
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
