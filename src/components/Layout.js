import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { List,Toolbar, AppBar, Drawer,Typography,Divider,IconButton  } from 'material-ui';
import { Menu,ChevronLeft,ChevronRight } from 'material-ui-icons';
import withWidth from 'material-ui/utils/withWidth';
import SideMenuItems  from './SideMenuItems'
import ProfileMenu  from './ProfileMenu'
import UserStore from '../stores/UserStore'
import RequestNotificationPermission from './RequestNotificationPermission'
import { withRouter } from 'react-router'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    width:'20%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
});

class Layout extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({open: nextProps.width === 'lg'});
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        {this.state.isAuth ? <RequestNotificationPermission /> : null }
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              Sign
            </Typography>
            <ProfileMenu isAuth={this.state.isAuth} signout={this.signout} info={UserStore.info()}/>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List><SideMenuItems isAuth={this.state.isAuth} /></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />   
          {this.props.children}
        </main>
      </div>
    );
  }

}


export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(Layout)));

