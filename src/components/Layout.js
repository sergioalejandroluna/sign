import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { AppBar, Grid, Hidden, IconButton, Paper, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import ProfileMenu from './ProfileMenu'
import LayoutDrawer from './LayoutDrawer'
import UserStore from '../stores/UserStore'
import RequestNotificationPermission from './RequestNotificationPermission'
import { withRouter } from 'react-router'
import styles from './LayoutStyle'
import pathName from '../PathToName'
import SearchBar from './SearchBar'

class Layout extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = () => {
    this.setState(ps => {
      return { open: !ps.open };
    });
  };

  signout = () => {
    UserStore.signout().then(a => {
      this.setState({ isAuth: a });
      this.props.history.push("/login");
    });
  };

  componentDidMount() {
    const isAuth = UserStore.isAuthenticated;
    if (this.state.isAuth !== isAuth) {
      this.setState({ isAuth: isAuth });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.isAuth ? <RequestNotificationPermission /> : null}
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={true}>
            <Grid container spacing={0}
                  justify={'space-between'}
                  direction={'row'}
                  alignItems={'center'}
            >

              <Grid item sm={4} md={3} lg={3}>

                <IconButton
                  style={{float: 'left'}}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.toggleDrawer}
                  className={classNames(classes.menuButton)}
                >
                  <Menu />

                </IconButton>

                <Typography variant="title" color="inherit" style={{paddingTop: 11}} noWrap className={classes.flex}>
                  {pathName(this.props.location.pathname)}
                </Typography>

              </Grid>

              <Grid item xs={1} sm={5} md={5} lg={6}>
                <SearchBar
                  isAuth={this.state.isAuth}
                  onChange={() => {
                  }}
                  onRequestSearch={(event) => {
                  }}
                  style={{
                    margin: '0 auto',
                    maxWidth: 800,
                    textAlign: 'right',
                  }}
                />
              </Grid>

              <Grid item sm={2} md={3} lg={3}
                    style={{float: 'right'}}
              >
                <ProfileMenu isAuth={this.state.isAuth} signout={this.signout} info={UserStore.info()} />
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
        <LayoutDrawer
          open={this.state.open}
          toggleOpen={this.toggleDrawer}
          classes={classes}
          isAuth={this.state.isAuth}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Hidden smDown>
            <br />
          </Hidden>
          {this.state.isAuth ? (
            <Grid container>
            <Grid item lg={2} xl={2} md={1} sm={false} />
            <Grid item lg={8} xl={8} md={10} sm={12}>
              <Paper className={classes.rootPaper}>{this.props.children}</Paper>
              <br />
            </Grid>
            <Grid item lg={2} xl={2} md={1} sm={false} />
            </Grid>
        ) : (
            <Grid container>
            <Grid item className={classes.login_content}>
            <Paper className={classes.rootPaper}>{this.props.children}</Paper>
            <br />
            </Grid>
          </Grid>
          )}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Layout));
