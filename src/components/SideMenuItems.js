import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VpnKey, Person, Inbox, Drafts, Send, Restore  } from '@material-ui/icons';
import {  Link } from "react-router-dom";
import pathName from '../PathToName'

const styles = theme => ({
  selected:{
    backgroundColor: theme.palette.primary.light,
  } 
})


const AuthItems = ({onClose,classes}) => {
  const setProps = l => {
    const props={to: l}
    if (window.location.pathname===l)
      props.className= classes.selected
    return props
  }
  return(
    <div onClick={ onClose} >
      <ListItem component={Link} {...setProps('/recibidos')}  button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary={pathName('/recibidos')} />
      </ListItem>

      <ListItem component={Link} {...setProps('/borradores')} button>
        <ListItemIcon>
          <Drafts />
        </ListItemIcon>
        <ListItemText primary={pathName('/borradores')} />
      </ListItem>

      <ListItem component={Link} {...setProps('/enviados')}  button>
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        <ListItemText primary={pathName('/enviados')} />
      </ListItem>

      <ListItem component={Link} {...setProps('/en-revision')} button>
        <ListItemIcon>
          <Restore />
        </ListItemIcon>
        <ListItemText primary={pathName('/en-revision')} />
      </ListItem>

      <ListItem component={Link} {...setProps('/delegar')} button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={pathName('/delegar')} />
      </ListItem>
    </div>
  )
};


const SideMenuItems =({isAuth, onClose, classes})=> {
  if (isAuth)
    return(
      <AuthItems onClose={onClose} classes={classes} />
    )
  else
    return (
      <div>
        <ListItem component={Link} to='/login' button>
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Ingresar" />
        </ListItem>
      </div>
    );
};

export default withStyles(styles, { withTheme: true })(SideMenuItems)
