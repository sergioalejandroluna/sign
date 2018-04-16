import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from 'material-ui';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';



const  DocActionButtons =({ onSend, disableSend })=>{

  return (
    <Grid container >
      <Grid item  >
        <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
          Volver
        </Button>
      </Grid>
      <Grid item  >
        <Button  variant='raised' color='primary' onClick={onSend} disabled={disableSend()} >
          Enviar
        </Button>
      </Grid>
    </Grid>
  )
}

DocActionButtons.propTypes={
  onSend: PropTypes.func.isRequired,
  disableSend: PropTypes.func.isRequired,
}
export default DocActionButtons;
