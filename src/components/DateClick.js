import React from 'react'
import { TextField } from 'material-ui';
import PropTypes from 'prop-types'
const dateOpt={  year: 'numeric', month: 'long', day: 'numeric' };
class DateClick extends React.Component{

  state={editing:false}

  setEditing=e=>{
    if (this.props.disabled)
      return 
    if (this.state.editing)
      return 
    this.setState({editing: true})
    this.input.focus();
  }

  setReading=e=>{
    if (!this.state.editing)
      return 
    this.setState({editing: false})
  }

  mxDateString=()=>{
    let event=new Date(Date.parse(this.props.value+" 00:00"))
    return event.toLocaleDateString('es-MX', dateOpt)
  }

  finalText=()=>{
    return this.props.beforeText+this.mxDateString()
  }

  render() {
    const editing=this.state.editing
    return(
      <TextField 
        type={editing ? 'date' : 'text'}
        value={editing ? this.props.value : this.finalText()}
        onChange={this.props.onChange}
        onBlur={ this.setReading}
        onClick={this.setEditing}
        className="align-right"
        disabled={this.props.disabled}
        fullWidth
        inputRef={input=>{this.input=input} }
      />
    )
  }
}
DateClick.propTypes={
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
export default DateClick;
