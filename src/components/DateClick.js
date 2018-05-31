import React from 'react'
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types'
const dateOpt={  year: 'numeric', month: 'long', day: 'numeric' };
class DateClick extends React.Component{

  constructor(props){
    super(props)
    this.state={editing:false, value: props.value}
  }


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
    let event=new Date(Date.parse(this.state.value+" 00:00"))
    return event.toLocaleDateString('es-MX', dateOpt)
  }

  finalText=()=>{
    return this.props.beforeText+this.mxDateString()
  }

  onChange=(e)=>{
    const value=e.target.value
    this.setState({value: value})
    this.props.onChange(value)
  }

  render() {
    const editing=this.state.editing
    return(
      <TextField 
        type={editing ? 'date' : 'text'}
        value={editing ? this.state.value : this.finalText()}
        onChange={this.onChange}
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
