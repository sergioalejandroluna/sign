import React from "react";
import PropTypes from "prop-types";
import { Logo } from "../img";
import DateClick from "./DateClick";
import SearchUserField from "./SearchUserField";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Done, Group, DoneAll } from "@material-ui/icons";
import UserGroupDetail from "./UserGroupDetail";
import { ReadDetailDialog } from "./DocDialogs";

class DocHeader extends React.Component {
  state = {
    groupModal: false,
    readModal: false
  };
  shouldComponentUpdate(nextProps, nextState) {
    const tprops = this.props;
    return (
      tprops.disabled !== nextProps.disabled ||
      tprops.date !== nextProps.date ||
      tprops.folio !== nextProps.folio ||
      tprops.to !== nextProps.to ||
      tprops.read !== nextProps.read ||
      this.state.readModal !== nextState.readModal ||
      this.state.groupModal !== nextState.groupModal
    );
  }

  openGroupModal = e => {
    this.setState({ groupModal: true });
  };

  closeGroupModal = e => {
    this.setState({ groupModal: false });
  };
  openReadModal = e => {
    this.setState({ readModal: true });
  };

  closeReadModal = e => {
    this.setState({ readModal: false });
  };

  onGroupChange = group => {
    const { to, onToChange } = this.props;
    const toUser = {
      ...to,
      name: { ...to.name, full: group.short_name },
      job_title: group.long_name
    };
    onToChange(toUser);
  };

  render() {
    const {
      onDateChange,
      onToChange,
      disabled,
      to,
      date,
      folio,
      read,
      sent,
      readDetail
    } = this.props;
    return (
      <Grid container spacing={0} alignItems="flex-end">
        <Grid item sm={1} md={1} lg={1}>
          <Grid container justify="flex-start">
            <img src={Logo} alt="logo" className="logo-doc" />
          </Grid>
        </Grid>
        <Grid item sm={11} md={11} lg={11}>
          <Grid container direction="column" alignItems="flex-end">
            <Grid container justify="flex-end">
              <Grid item sm={5} md={5} lg={5}>
                <DateClick
                  value={date}
                  onChange={onDateChange}
                  beforeText="Chihuahua, Chih., a "
                  disabled={disabled}
                />
              </Grid>
            </Grid>
            <Grid item lg={3}>
              <TextField
                value={folio}
                className="align-right bold"
                disabled={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="greeting">
          <Grid item lg={8} className="bold">
            <Grid item>
              <SearchUserField
                to={to}
                onChange={onToChange}
                disabled={disabled}
                includeGroups
              />
            </Grid>
            <Grid item>{to.job_title}</Grid>
            <Grid item>{to.institution}</Grid>
            <Grid item>Presente</Grid>
          </Grid>
          <Grid item lg={1}>
            {to.group && !disabled ? (
              <React.Fragment>
                <IconButton onClick={this.openGroupModal}>
                  <Group />
                </IconButton>
                <UserGroupDetail
                  group={{
                    ...to,
                    short_name: to.name.full,
                    long_name: to.job_title
                  }}
                  onChange={this.onGroupChange}
                  open={this.state.modal}
                  onClose={this.closeGroupModal}
                />
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item lg={3}>
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                {sent === true ? (
                  <React.Fragment>
                    <IconButton onClick={this.openReadModal}>
                      {read ? (
                        <DoneAll style={{ fontSize: 36 }} titleAccess="Visto" />
                      ) : (
                        <Done
                          style={{ fontSize: 36 }}
                          titleAccess="Entregado"
                        />
                      )}
                    </IconButton>
                    <ReadDetailDialog
                      open={this.state.readModal}
                      onClose={this.closeReadModal}
                      detail={readDetail}
                    />
                  </React.Fragment>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
DocHeader.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  folio: PropTypes.string.isRequired,
  to: PropTypes.object.isRequired,
  onToChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  read: PropTypes.bool.isRequired,
  sent: PropTypes.bool.isRequired,
  readDetail: PropTypes.array.isRequired
};

export default DocHeader;
