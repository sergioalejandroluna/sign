import React from "react";
import PropTypes from "prop-types";
import { Done, DoneAll } from "@material-ui/icons";
import {
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Avatar,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core/";

export const ChooseAccount = props => {
  const { handleClose, open, users, handleSelect } = props;
  return (
    <Dialog onClose={handleClose} aria-labelledby="choose-account" open={open}>
      <DialogTitle id="choose-account">Selecciona remitente</DialogTitle>
      <div>
        <List>
          {users.map(user => (
            <ListItem button onClick={() => handleSelect(user)} key={user.id}>
              <ListItemAvatar>
                <Avatar src={user.photo} />
              </ListItemAvatar>
              <ListItemText primary={user.name.full} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
};
export const ReadDetailDialog = props => {
  const { onClose, open, detail } = props;
  return (
    <Dialog onClose={onClose} aria-labelledby="choose-account" open={open}>
      <DialogTitle id="choose-account">Visto por</DialogTitle>
      <div>
        <List>
          {detail.map(d => (
            <ListItem button key={d.to.id}>
              <ListItemAvatar>
                <Avatar src={d.to.photo} />
              </ListItemAvatar>
              <ListItemText primary={d.to.name.full} secondary={d.to.email} />
              <ListItemSecondaryAction>
                {d.read === true ? (
                  <DoneAll titleAccess="Visto" />
                ) : (
                  <Done titleAccess="Entregado " />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
};
ReadDetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  detail: PropTypes.array.isRequired
};

ChooseAccount.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired
};
