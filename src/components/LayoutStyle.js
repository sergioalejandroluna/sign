const drawerWidth = 240;

const styles = theme => {
  const small_up = theme.breakpoints.up("md");
  const rootPaper = {};
  rootPaper[small_up] = { padding: 40 };

  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
        '@media print':{
          border: 'none',
          boxShadow: 'none'
        }
    },
    appBar: {
      position: "fixed",
      "@media print": {
        display: "none"
      },
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
      minHeight: 48
    },
    hide: {
      display: "none"
    },
    drawerPaper: {
      "@media print": {
        display: "none"
      },
      position: "fixed",
      width: drawerWidth,
      //if you remove this, the close/open animations gonna bounce around
      whiteSpace: "nowrap",
      overflow: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperSm: {
      width: 0
    },
    drawerPaperMd: {
      width: 70
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      width: "20%",
      backgroundColor: theme.palette.background.default
    },
    rootPaper: rootPaper,
    flex: {
      flex: 1
    },
    '@media print':{
      border: 'none',
      boxShadow: 'none'
    }

  };
};
export default styles;
