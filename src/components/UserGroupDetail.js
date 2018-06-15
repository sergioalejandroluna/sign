import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AbstractUserList from "./containers/AbstractUserList";
import UserGroupStore from "../stores/UserGroupStore";

class UserGroupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.group;
  }

  onChangeName = (value, field) => {
    this.setState(ps => {
      const ns = { ...ps };
      ns[field] = value;
      //in  UserGroup we have a list with  the objects and id, wee need to return the old id in order to keep track of the list
      this.props.onChange({ ...ns, id: this.props.group.id });
      if (ns.short_name !== "" && ns.long_name !== "") this.sendApi(ns);
      return ns;
    });
  };

  sendApi = group => {
    UserGroupStore.save(group).then(r => {
      if (r.data.id !== this.state.id) {
        this.setState({ id: r.data.id });
      }
    });
  };
  onClose = e => {
    const { group, onClose } = this.props;
    if (group.id !== this.state.id)
      onClose(e, { type: "new", old_id: group.id, new_id: this.state.id });
    else if (this.state.id === 0) onClose(e, { type: "cancel" });
    else onClose(e, { type: "update" });
  };

  render() {
    const { short_name, long_name } = this.state;
    const { open } = this.props;
    return (
      <React.Fragment>
        <Dialog open={open} onClose={this.onClose} maxWidth="md" fullWidth>
          <DialogTitle id="form-dialog-title">Grupo </DialogTitle>
          <DialogContent>
            <Grid container spacing={8}>
              <Grid item lg={3}>
                <TextField
                  label="Nombre"
                  value={short_name}
                  fullWidth
                  onChange={e => {
                    this.onChangeName(e.target.value, "short_name");
                  }}
                />
              </Grid>
              <Grid item lg={9}>
                <TextField
                  label="Descripcion"
                  value={long_name}
                  multiline
                  onChange={e => {
                    this.onChangeName(e.target.value, "long_name");
                  }}
                  rowsMax="4"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12}>
                <UserList group_id={this.state.id} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

class UserList extends AbstractUserList {
  getStore() {
    UserGroupStore.setGroup(this.props.group_id);
    return UserGroupStore;
  }
}
UserGroupDetail.propTypes = {
  group: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
export default UserGroupDetail;
