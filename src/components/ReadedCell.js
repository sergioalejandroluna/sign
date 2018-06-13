import React from "react";
import { TableCell } from "@material-ui/core";
import PropTypes from "prop-types";
import { Done } from "@material-ui/icons";
import DocStore from "../stores/DocStore";
// check if the document has been reded with websockets
export class ReadedCell extends React.Component {
  state = {
    readed: this.props.readed
  };

  componentDidMount() {
    //just subs when the document hasnt been readed
    if (!this.state.readed) {
      this.subs = DocStore.getReadedChannel(this.props.id, this.onReaded);
    }
  }
  componentWillUnmount() {
    if (this.subs !== undefined) {
      this.subs.unsubscribe();
    }
  }

  onReaded = data => {
    this.setState({ readed: data });
  };

  render() {
    const { readed } = this.state;
    if (readed)
      return (
        <TableCell>
          <Done />
        </TableCell>
      );
    else return <TableCell />;
  }
}
ReadedCell.propTypes = {
  readed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};
export default ReadedCell;
