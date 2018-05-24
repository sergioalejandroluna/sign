import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, List, ListItem, ListItemAvatar, ListItemText,DialogTitle, Avatar} from '@material-ui/core/';


export const ChooseAccount =(props)=> {
  const {handleClose, open, users, handleSelect}= props
    return (
      <Dialog onClose={handleClose} aria-labelledby="choose-account" open={open} >
        <DialogTitle id="choose-account">Selecciona remitente</DialogTitle>
        <div>
          <List>
            {users.map(user => (
              <ListItem button onClick={() => handleSelect(user)} key={user.id}>
                <ListItemAvatar>
                  <Avatar src={user.photo}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name.full} secondary={user.email} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
}

ChooseAccount.propTypes={
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
}
