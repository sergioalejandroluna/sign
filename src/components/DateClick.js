import React from 'react'
import { TextField,Grid,Button } from 'material-ui';
import PropTypes from 'prop-types'
import { Create } from 'material-ui-icons'
import { observer } from 'mobx-react';
const dateOpt={  year: 'numeric', month: 'long', day: 'numeric' };

@observer
class DateClick extends React.Component{

  state={editing:false}

  toggleState=e=>{
    this.setState({editing: !this.state.editing})
  }
  
  mxDateString=()=>{
    let event=new Date(Date.parse(this.props.value))
    return event.toLocaleDateString('es-MX', dateOpt)
  }

  render() {
    if(this.state.editing){
      return(
        <Grid container>
          <Grid item>
            <TextField 
              label='Fecha'
              type='date'
              value={this.props.value}
              onChange={this.props.onChange}
              helperText='Fecha del oficio'
              onBlur={ this.toggleState}
              autoFocus
            />
          </Grid> 
        </Grid>
      )
    }
    return(
      <Grid container alignItems='flex-end' justify='flex-end'>
        <Grid item >
          {this.props.beforeText}<span style={{textTransform: 'capitalize'}}>{this.mxDateString()}</span>
        </Grid> 
        <Grid item>
          <Button size='small' onClick={ this.toggleState}>
            <Create />
          </Button>
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
