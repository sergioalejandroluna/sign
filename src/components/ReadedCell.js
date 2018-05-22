import React from 'react';
import  {TableCell} from 'material-ui/Table';
import {  Done } from 'material-ui-icons';
import DocStore from '../stores/DocStore'

export class ReadedCell extends React.Component {
  state={
    readed: this.props.readed 
  }

  componentDidMount(){
    //just subs when the document hasnt been readed 
    if (!this.state.readed){
      this.subs=DocStore.getDocChannel(this.props.id, this.onReaded);
    }
  }
  componentWillUnmount(){
    if (this.subs!==undefined){
      this.subs.unsubscribe()
    }
  }

  onReaded=(data)=>{
     this.setState({readed: data})
  }

  render(){
    const {readed}=this.state
    if (readed)
      return (
        <TableCell>
          <Done/>
        </TableCell>
      )
    else 
      return (
        <TableCell/>
      )
  }
}
export default ReadedCell;
