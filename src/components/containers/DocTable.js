import React from 'react'
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import DocStore from '../../stores/DocStore';
class DocTable extends React.Component{
  state={docs:[],isLoaded:false}
  componentDidMount(){
    this.props.fetch.then(r=>{
      this.setState({docs:r.data,isLoaded:true})
    });
  }

  onDelete=(id)=>{
    DocStore.delete(id).then(r=>{
      let docs= [...this.state.docs]
      let foundIndex=docs.findIndex(x=>x.id===id)
      docs.splice(foundIndex,1)
      this.setState({docs:docs})
    })
  }

  render(){
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> 
              <Button  component={Link} to={'/folios/new'}  color="primary"> Nuevo </Button> 
            </TableCell>
            <TableCell >Folio</TableCell>
            <TableCell >De</TableCell>
            <TableCell >Para</TableCell>
            <TableCell >Creado por</TableCell>
          </TableRow>
        </TableHead>
        {this.renderBody()}
      </Table>
    )
  }

  renderBody(){
    if(this.state.isLoaded)
      return (
        <TableBody>
          {this.state.docs.map(d => {
            return (
              <TableRow key={d.id}>
                <TableCell> 
                  <Button component={Link} to={'/folios/'+d.id}   color="primary"> Editar </Button>
                  <Button onClick={()=>this.onDelete(d.id)} color="secondary" > Borrar </Button>
                </TableCell>
                <TableCell >{d.folio}</TableCell>
                <TableCell >{d.from}</TableCell>
                <TableCell >{d.to}</TableCell>
                <TableCell >{d.created_by}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    // you need render something inside of the table body!!!!
    return(<TableBody >
              <TableRow >
                <TableCell> 
                </TableCell>
              </TableRow>
      </TableBody>)
  }
}
export default DocTable;
