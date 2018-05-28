import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { List,Toolbar, AppBar, Typography,Divider,IconButton, Grid  } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import SideMenuItems  from './SideMenuItems'
import ProfileMenu  from './ProfileMenu'
import LayoutDrawer  from './LayoutDrawer'
import UserStore from '../stores/UserStore'
import RequestNotificationPermission from './RequestNotificationPermission'
import { withRouter } from 'react-router'
import styles from './LayoutStyle'

class Layout extends React.Component {
	state = {
		open: false,
	};

	toggleDrawer = () => {
		this.setState((ps)=>{
			return {open: !ps.open}
		});
	};

	signout = () => {
		UserStore.signout().then((a)=>{
			this.setState({isAuth: a});
			this.props.history.push('/login')
		});
	};

	componentDidMount(){
		const isAuth=UserStore.isAuthenticated
		if (this.state.isAuth !== isAuth) {
			this.setState({isAuth: isAuth});
		}
	}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.isAuth ? <RequestNotificationPermission /> : null }
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              className={classNames(classes.menuButton )}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              Sign
            </Typography>
            <ProfileMenu isAuth={this.state.isAuth} signout={this.signout} info={UserStore.info()}/>
          </Toolbar>
        </AppBar>
        <LayoutDrawer 
          open={this.state.open}
          toggleOpen={this.toggleDrawer}
          classes={classes}
        > 
          <SideMenuItems isAuth={this.state.isAuth} />
        </LayoutDrawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />   
          <Grid container >
            <Grid item lg={2} xl={3} md={1} />
            <Grid item lg={8} xl={6} md={10} >{this.props.children}</Grid>
            <Grid item lg={2} xl={3} md={1} />
          </Grid>
        </main>
      </div>
    );
  }

}


export default withStyles(styles, { withTheme: true })(withRouter(Layout));

