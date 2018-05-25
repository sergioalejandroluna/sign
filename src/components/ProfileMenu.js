import React from 'react';
import { Avatar, Menu,MenuItem, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  primary: {
    color: theme.palette.secondary.light
  }
});


class ProfileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logout = () => {
    this.setState({ anchorEl: null });
    this.props.signout()
  };
  render(){
    if (!this.props.isAuth)
      return null
    const { classes } = this.props;
    const {  anchorEl } = this.state;
    const open = Boolean(anchorEl);
        // in order to center the menu https://@material-ui/core-next.com/demos/menus/#menulist-composition
    return (
      <div>
        <MenuItem  component="div" 
          onClick={this.handleMenu}
        >
          <Avatar src={this.props.info.photo} alt="photo"  /> 
          <ListItemText disableTypography primary={ this.props.info.name } className={classes.primary}  />
        </MenuItem>
        <Menu
          id="menu-profile"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.logout}>Cerrar sesión</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProfileMenu)
