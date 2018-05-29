import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
const styles={
  float:{
    position: 'fixed',
    bottom: 24,
    right: 24
  }
}
const FloatActions=({classes})=>{
  return (
    <div  className={classes.float} >
      <Grid container  >
        <Grid item >
          <Tooltip  title="Crear " >
            <Button component={Link} to={'/oficios/new'} variant="fab" color="primary" aria-label="add" >
              <AddIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>   
    </div>
  )
}


export default withStyles(styles)(FloatActions);
