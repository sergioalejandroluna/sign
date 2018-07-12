import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'

class  DocActionButtons extends React.Component{
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    const { onSend, disabled, canSend, hideSend, goBack }= this.props
    return (
      <Grid container >
        <Grid item  >
          <Button onClick={goBack} variant='raised' color='primary' className="back"  >
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
  goBack: PropTypes.func.isRequired,
}
export default DocActionButtons;
