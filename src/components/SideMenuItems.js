import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  VpnKey,
  DeviceHub,
  Inbox,
  Drafts,
  Send,
  Restore,
  Group
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import pathName from "../PathToName";

const styles = theme => ({
  default: {
    backgroundColor: theme.palette.secondary.main
  }
});

class AuthItems extends React.Component {
  setProps = l => {
    const props = { to: l };
    let currPath = window.location.pathname;
    if (currPath === "/") currPath = "/recibidos";
    if (currPath === l) props.className = this.props.classes.default;
    return props;
  };
  render() {
    const { onClose } = this.props;
    return (
      <div onClick={onClose}>
        <ListItem component={Link} {...this.setProps("/recibidos")} button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary={pathName("/recibidos")} />
        </ListItem>

        <ListItem component={Link} {...this.setProps("/borradores")} button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary={pathName("/borradores")} />
        </ListItem>

        <ListItem component={Link} {...this.setProps("/enviados")} button>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary={pathName("/enviados")} />
        </ListItem>

        <ListItem component={Link} {...this.setProps("/en-revision")} button>
          <ListItemIcon>
            <Restore />
          </ListItemIcon>
          <ListItemText primary={pathName("/en-revision")} />
        </ListItem>

        <ListItem component={Link} {...this.setProps("/delegar")} button>
          <ListItemIcon>
            <DeviceHub />
          </ListItemIcon>
          <ListItemText primary={pathName("/delegar")} />
        </ListItem>
        <ListItem component={Link} {...this.setProps("/grupos")} button>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary={pathName("/grupos")} />
        </ListItem>
      </div>
    );
  }
}

const SideMenuItems = ({ isAuth, onClose, classes }) => {
  if (isAuth) return <AuthItems onClose={onClose} classes={classes} />;
  else
    return (
      <div>
        <ListItem component={Link} to="/login" button>
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Ingresar" />
        </ListItem>
      </div>
    );
};

export default withStyles(styles, { withTheme: true })(SideMenuItems);
