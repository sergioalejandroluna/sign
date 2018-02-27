import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Home, Description } from 'material-ui-icons';
import {  Link } from "react-router-dom";

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
  </div>
);


