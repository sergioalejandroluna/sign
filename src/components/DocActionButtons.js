import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



class  DocActionButtons extends React.Component{
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    const { onSend, disabled, canSend, hideSend }= this.props
    return (
      <Grid container >
        <Grid item  >
          <Button component={Link} to='/oficios' variant='raised' color='primary' className="back"  >
            Volver
          </Button>
        </Grid>
        <Grid item  >
          {hideSend ? null : <Button  variant='raised' color='primary' onClick={onSend} disabled={disabled} >
            { canSend ?  'Firmar y enviar' : 'Solicitar firma' }
          </Button>}
        </Grid>
      </Grid>
    )
  }
}

DocActionButtons.propTypes={
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  canSend: PropTypes.bool.isRequired,
  hideSend: PropTypes.bool.isRequired,
}
export default DocActionButtons;
