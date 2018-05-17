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
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DocStore from '../../stores/DocStore';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);



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
    this.props.fetch.then(r=>{
      this.setState({docs:r.data.docs,count:r.data.total,isLoaded:true})
    });
  }

  getDocs(){
    const { rowsPerPage, page }  = this.state;
    DocStore.fetchDocs(rowsPerPage, page).then(r=>{
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
  handleChangePage = (event, page) => {
    const { rowsPerPage }  = this.state;
    DocStore.fetchDocs(rowsPerPage, page).then(r=>{
      // console.log(r);
      this.setState({docs:r.data,page: page})

      // console.log(this.state);

    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
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
                  Actions={TablePaginationActionsWrapped}
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

};

export default withStyles(styles)(DocTable);