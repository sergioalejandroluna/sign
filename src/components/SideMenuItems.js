import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { VpnKey, Person, Inbox, Drafts, Send, Restore  } from '@material-ui/icons';
import {  Link } from "react-router-dom";

const AuthItems = () => {
  return(
    <div>
       <ListItem component={Link} to='/recibidos' button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="Recibidos " />
      </ListItem>

      <ListItem component={Link} to='/borradores' button>
        <ListItemIcon>
          <Drafts />
        </ListItemIcon>
        <ListItemText primary="Borradores " />
      </ListItem>

      <ListItem component={Link} to='/enviados' button>
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        <ListItemText primary="Enviados " />
      </ListItem>

      <ListItem component={Link} to='/enRevision' button>
        <ListItemIcon>
          <Restore />
        </ListItemIcon>
        <ListItemText primary="En revisión " />
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
