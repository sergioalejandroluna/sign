import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from 'material-ui';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';



class  DocActionButtons extends React.Component{
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    const { onSend, disabled }= this.props
    return (
      <Grid container >
        <Grid item  >
          <Button component={Link} to='/folios' variant='raised' color='primary' className="back"  >
            Volver
          </Button>
        </Grid>
        <Grid item  >
          <Button  variant='raised' color='primary' onClick={onSend} disabled={disabled} >
            Enviar
          </Button>
        </Grid>
      </Grid>
    )
  }
}

DocActionButtons.propTypes={
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}
export default DocActionButtons;
