import React from 'react'
import { TextField,Grid } from 'material-ui';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react';
const dateOpt={  year: 'numeric', month: 'long', day: 'numeric' };
@observer
class DateClick extends React.Component{

  state={editing:false}

  toggleState=e=>{
    this.setState({editing: !this.state.editing})
  }
  
  mxDateString=()=>{
    let event=new Date(Date.parse(this.props.value+" 00:00"))
    return event.toLocaleDateString('es-MX', dateOpt)
  }

  finalText=()=>{
    return this.props.beforeText+this.mxDateString()
  }

  render() {
    if(this.state.editing){
      return(
      <Grid container alignItems='flex-end' justify='flex-end'>
          <Grid item lg={3}>
            <TextField 
              label='Fecha'
              type='date'
              value={this.props.value}
              onChange={this.props.onChange}
              helperText='Fecha del oficio'
              onBlur={ this.toggleState}
              className="align-right"
              autoFocus
              fullWidth
            />
          </Grid> 
        </Grid>
      )
    }
    return(
      <Grid container alignItems='flex-end' justify='flex-end'>
        <Grid item lg={3}>
            <TextField 
              type='text'
              value={this.finalText()}
              fullWidth
              onClick={this.toggleState}
              className="align-right"
            /> 
        </Grid> 
      </Grid>
    )
  }
}
DateClick.propTypes={
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
export default DateClick;
