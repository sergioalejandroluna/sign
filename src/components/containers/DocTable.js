import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import DocStore from '../../stores/DocStore';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export class DocTable extends React.Component {

  state = {docs:[],isLoaded:false,
    page: 0,
    rowsPerPage: 5,
    count: 0
  };

  componentDidMount(){
    DocStore.fetch(this.props.fetch).then(r=>{
      this.setState({docs:r.data.docs,count:r.data.total,isLoaded:true})
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
  handleChangePage = (event, page) => {
    const { rowsPerPage }  = this.state;
    DocStore.fetch(this.props.fetch,rowsPerPage, page+1).then(r=>{
      this.setState({docs:r.data.docs,count:r.data.total, page: page })
    });
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage= event.target.value ;
    const { page }= this.state
    DocStore.fetch(this.props.fetch,rowsPerPage, page).then(r=>{
      this.setState({docs:r.data.docs,count:r.data.total,rowsPerPage: rowsPerPage})
    });
  };


  labelDisplayRows =  ({ from, to, count }) => {
    return `${from}-${to} de ${count}`
  };

  render() {
    // console.log(this.state);
    const { classes } = this.props;
    const { docs, rowsPerPage, page, count } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Button className="PaginationButton" component={Link} to={'/oficios/new'}  color="primary"> Nuevo </Button>
                </TableCell>
                <TableCell >Folio</TableCell>
                <TableCell >De</TableCell>
                <TableCell >Para</TableCell>
                <TableCell >Creado por</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.map(d => {
                return (
                  <TableRow key={d.id}>
                    <TableCell>
                      <Button className="PaginationButton"  component={Link} to={'/oficios/'+d.id}   color="primary"> Editar </Button>
                      <Button onClick={()=>this.onDelete(d.id)} color="secondary" > Borrar </Button>
                    </TableCell>
                    <TableCell >{d.folio}</TableCell>
                    <TableCell >{d.from}</TableCell>
                    <TableCell >{d.to}</TableCell>
                    <TableCell >{d.created_by}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelDisplayedRows={this.labelDisplayRows}
                  labelRowsPerPage='Resultados por página'
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

DocTable.propTypes = {
  fetch: PropTypes.string.isRequired,
};

export default withStyles(styles)(DocTable);
