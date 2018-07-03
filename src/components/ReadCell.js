import React from "react";
import { TableCell } from "@material-ui/core";
import PropTypes from "prop-types";
import { Done } from "@material-ui/icons";
import DocStore from "../stores/DocStore";
// check if the document has been reded with websockets
export class ReadCell extends React.Component {
  state = {
    read: this.props.read
  };

  componentDidMount() {
    //just subs when the document hasnt been read
    if (!this.state.read) {
      this.subs = DocStore.getReadChannel(this.props.id, this.onRead);
    }
  }
  componentWillUnmount() {
    if (this.subs !== undefined) {
      this.subs.unsubscribe();
    }
  }

  onRead = data => {
    this.setState({ read: data });
  };

  render() {
    const { read } = this.state;
    if (read)
      return (
        <TableCell>
          <Done />
        </TableCell>
      );
    else return <TableCell />;
  }
}
ReadCell.propTypes = {
  read: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};
export default ReadCell;
