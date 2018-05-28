import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { VpnKey, Person, Inbox, Drafts, Send, Restore  } from '@material-ui/icons';
import {  Link } from "react-router-dom";
import pathName from '../PathToName'

const AuthItems = ({onClose}) => {
  return(
    <div onClick={ onClose} >
       <ListItem component={Link} to='/recibidos'  button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary={pathName('/recibidos')} />
      </ListItem>

      <ListItem component={Link} to='/borradores' button>
        <ListItemIcon>
          <Drafts />
        </ListItemIcon>
        <ListItemText primary={pathName('/borradores')} />
      </ListItem>

      <ListItem component={Link} to='/enviados' button>
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        <ListItemText primary={pathName('/enviados')} />
      </ListItem>

      <ListItem component={Link} to='/en-revision' button>
        <ListItemIcon>
          <Restore />
        </ListItemIcon>
        <ListItemText primary={pathName('/en-revision')} />
      </ListItem>

      <ListItem component={Link} to='/delegar' button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={pathName('/delegar')} />
      </ListItem>
    </div>
  )
};


const SideMenuItems =({isAuth, onClose})=> {
  if (isAuth)
    return(
      <AuthItems onClose={onClose} />
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
