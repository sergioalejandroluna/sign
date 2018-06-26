import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import FloatActions from '../FloatActions'
import ReadedCell from '../ReadedCell'
import DocStore from '../../stores/DocStore'

export class DocTable extends React.Component {
  state = {
    docs: [],
    isLoaded: false,
    page: 0,
    rowsPerPage: 5,
    count: 0
  }

  componentDidMount() {
    DocStore.fetch(this.props.fetch,'','',this.props.q).then(r => {
      this.setState({ docs: r.data.docs, count: r.data.total, isLoaded: true, q:'' });
    });
    if (this.props.fetch === "inbox")
      this.subs = DocStore.getInboxChannel(this.onNewInbox);
  }

  componentDidUpdate (prevProps) {
    if (this.props.q !== prevProps.q)
      DocStore.fetch(this.props.fetch, '', '', this.props.q).then(r => {
        this.setState({docs: r.data.docs, count: r.data.total, isLoaded: true, q: ''})
      })
  }

  onNewInbox = data => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.docs = [...prevState.docs];
      if (newState.docs.length === newState.rowsPerPage) newState.docs.pop();
      data.new = true;
      newState.docs.unshift(data);
      return newState;
    });
  };

  onDelete = id => {
    DocStore.delete(id).then(r => {
      let docs = [...this.state.docs];
      let foundIndex = docs.findIndex(x => x.id === id);
      docs.splice(foundIndex, 1);
      this.setState({ docs: docs });
    });
  };
  handleChangePage = (event, page) => {
    const { rowsPerPage } = this.state;
    DocStore.fetch(this.props.fetch, rowsPerPage, page + 1).then(r => {
      this.setState({ docs: r.data.docs, count: r.data.total, page: page });
    });
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = event.target.value;
    const { page } = this.state;
    DocStore.fetch(this.props.fetch, rowsPerPage, page).then(r => {
      this.setState({
        docs: r.data.docs,
        count: r.data.total,
        rowsPerPage: rowsPerPage
      });
    });
  };

  labelDisplayRows = ({ from, to, count }) => {
    return `${from}-${to} de ${count}`;
  };

  render() {
    const { fetch } = this.props;
    const { docs, rowsPerPage, page, count } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);
    const sentTable = fetch === "sent";

    return (
      <React.Fragment>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Folio</TableCell>
                <TableCell>De</TableCell>
                <TableCell>Para</TableCell>
                <TableCell>Creado por</TableCell>
                {sentTable ? <TableCell>Visto</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.map(d => {
                return (
                  <TableRow key={d.id} className={d.new ? "alert" : null}>
                    <TableCell>
                      <Button
                        component={Link}
                        to={"/oficios/" + d.id}
                        color="primary"
                      >
                        {d.sent ? "Ver" : "Editar"}
                      </Button>
                      {!d.sent ? (
                        <Button
                          onClick={() => this.onDelete(d.id)}
                          color="secondary"
                        >
                          Borrar
                        </Button>
                      ) : null}
                    </TableCell>
                    <TableCell>{d.folio}</TableCell>
                    <TableCell>{d.from}</TableCell>
                    <TableCell>{d.to}</TableCell>
                    <TableCell>{d.created_by}</TableCell>
                    {sentTable ? (
                      <ReadedCell id={d.id} readed={d.readed || false} />
                    ) : null}
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
                  labelRowsPerPage="Resultados por página"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <FloatActions />
      </React.Fragment>
    );
  }
}

DocTable.propTypes = {
  fetch: PropTypes.string.isRequired
};

export default DocTable;
