import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl,HelpBlock,ControlLabel } from 'react-bootstrap';
import TextField from 'material-ui/TextField';

const Field=({type,value,name,validState,onChange,helperText})=>{

  return (
    <TextField
      label={name}
      type={type}
      value={value}
      onChange={onChange}
      helperText={helperText}
      fullWidth
    />
  )
}
Field.propTypes={
  value:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
export default Field;
