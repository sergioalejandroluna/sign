import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Home, Description, VpnKey, Person } from 'material-ui-icons';
import {  Link } from "react-router-dom";
import UserStore from '../stores/UserStore'
const AuthItems = () => {
  if (UserStore.isAuthenticated===false) 
    return null;
  return(
    <div>
      <ListItem component={Link} to='/delegar' button>
        <ListItemIcon>
          <Person />
    </ListItemIcon>
    <ListItemText primary="Delegar " />
    </ListItem>
    <ListItem component={Link} to='/login' onClick={()=>{ UserStore.signout() }} button>
      <ListItemIcon>
        <VpnKey />
    </ListItemIcon>
    <ListItemText primary="Cerrar Sesion" />
    </ListItem>
    </div>
  )
};


export const mailFolderListItems = (
  <div>
    <ListItem component={Link} to='/' button>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem component={Link} to='/folios' button>
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      <ListItemText primary="Folios" />
    </ListItem>
    <AuthItems />
  </div>
);

