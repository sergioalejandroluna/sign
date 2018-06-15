import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Remove, Edit } from "@material-ui/icons";
import UserGroupDetail from "../UserGroupDetail";
import UserGroupStore from "../../stores/UserGroupStore";

class UserGroups extends React.Component {
  state = {
    groups: [],
    showModal: -1
  };
  componentDidMount() {
    UserGroupStore.list().then(r => {
      this.setState({ groups: r.data });
    });
  }
  onNew = e => {
    this.setState(ps => {
      return {
        showModal: 0,
        groups: [{ id: 0, short_name: "", long_name: "" }, ...ps.groups]
      };
    });
  };

  openModal = group_id => {
    this.setState({ showModal: group_id });
  };

  closeModal = (e, res) => {
    this.setState(ps => {
      const ns = { ...ps, showModal: -1 };
      if (res.type === "new") {
        const index = ps.groups.findIndex(e => e.id === res.old_id);
        ns.groups[index].id = res.new_id;
      } else if (res.type === "cancel") {
        ns.groups.splice(0, 1);
      }
      return ns;
    });
  };

  onDelete = group => {
    UserGroupStore.delete(group).then(r => {
      this.setState(ps => {
        const ns = { ...ps };
        const index = ps.groups.findIndex(e => e.id === group.id);
        ns.groups.splice(index, 1);
        return ns;
      });
    });
  };

  onChange = group => {
    this.setState(ps => {
      const ng = [...ps.groups];
      let index = ng.findIndex(v => {
        return v.id === group.id;
      });
      ng[index] = group;
      return { groups: ng };
    });
  };

  render() {
    const { groups, showModal } = this.state;
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12}>
          <List>
            {groups.map(g => (
              <React.Fragment key={g.id}>
                <ListItem>
                  <ListItemText
                    primary={g.short_name}
                    secondary={g.long_name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={e => this.onDelete(g)}>
                      <Remove />
                    </IconButton>
                    <IconButton onClick={e => this.openModal(g.id)}>
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <UserGroupDetail
                  group={g}
                  onChange={this.onChange}
                  open={showModal === g.id}
                  onClose={this.closeModal}
                />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item lg={1} md={1} sm={1}>
            <Button color="primary" variant="raised" onClick={this.onNew}>
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

UserGroups.propTypes = {
  match: PropTypes.object.isRequired
};
export default UserGroups;
