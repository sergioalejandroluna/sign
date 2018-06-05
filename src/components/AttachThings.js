import React from "react";
import PropTypes from "prop-types";
import { Chip, Avatar, Grid, LinearProgress } from "@material-ui/core";
import DocStore from "../stores/DocStore";
import { withStyles } from "@material-ui/core/styles";

const fileInfo = f => {
  const name = f.split("/").pop();
  return name.split(".");
};

const styles = {
  root: {
    paddingTop: 8
  }
};

class AttachThings extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = { uploading: 0 };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const tprops = this.props;
    return (
      tprops.open !== nextProps.open ||
      tprops.files.length !== nextProps.files.length ||
      (nextState.uploading > 0 && nextState.uploading < 100)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open) {
      this.input.current.click();
      this.props.onClose();
    }
  }
  onProgress = pc => {
    this.setState(ps => {
      if (pc > ps.uploading || pc < 10) return { uploading: pc };
    });
  };

  render() {
    const { files, classes, onDelete, readOnly } = this.props;
    const { uploading } = this.state;
    if (uploading > 0 && uploading < 100)
      return (
        <LinearProgress variant="determinate" value={this.state.uploading} />
      );
    return (
      <Grid container spacing={8} className={classes.root}>
        {files.map((f, i) => {
          const info = fileInfo(f);
          return (
            <Grid item key={i}>
              <Chip
                avatar={<Avatar>{info[1]}</Avatar>}
                onClick={e => {
                  DocStore.downloadAttacment(f);
                }}
                label={info[0]}
                onDelete={
                  readOnly
                    ? null
                    : e => {
                        onDelete(f);
                      }
                }
              />
            </Grid>
          );
        })}
        <input
          type="file"
          className="hidden"
          ref={this.input}
          onChange={e => this.props.onChange(e, this.onProgress)}
          multiple
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(AttachThings);
AttachThings.propTypes = {
  open: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
