import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Home, Description, VpnKey, Person } from 'material-ui-icons';
import {  Link } from "react-router-dom";
const AuthItems = () => {
  return(
    <div>
      <ListItem component={Link} to='/' button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to='/delegar' button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Delegar " />
      </ListItem>
    </div>
  )
};


const SideMenuItems =({isAuth})=> {
  if (isAuth)
    return(
      <AuthItems  />
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

export default SideMenuItems
