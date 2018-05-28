import React from 'react';
import { withWidth, SwipeableDrawer, List, Divider  } from '@material-ui/core';
import {  isWidthUp } from '@material-ui/core/withWidth';
import SideMenuItems  from './SideMenuItems'
import PropTypes from 'prop-types'
import classNames from 'classnames';


const LayoutDrawer=({classes,open,isAuth,toggleOpen,width})=>{
  const md=isWidthUp('md', width)
  let widthClass=classes.drawerPaperSm;
  if(md)
    widthClass=classes.drawerPaperMd;

  return (
    <SwipeableDrawer
      variant={ md ? 'permanent': 'temporary' }
      elevation={1}
      classes={{
        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose, !open && widthClass),
      }}
      open={open}
      onOpen={  toggleOpen }
      onClose={  toggleOpen }
    >
      { md ? <div className={classes.toolbar}></div> : null }
      <Divider />
      <List >
        <SideMenuItems isAuth={isAuth} onClose={ md ? null : toggleOpen } />
      </List>
    </SwipeableDrawer>
  ) ;
}

export default  withWidth()(LayoutDrawer);

LayoutDrawer.propTypes={
  open: PropTypes.bool.isRequired,
  // children: PropTypes.node.isRequired,
}
