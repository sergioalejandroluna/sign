import React from 'react'
import PropTypes from 'prop-types'
import logo from '../logo.svg';
import DateClick from './DateClick'
import AutosuggestField from './AutosuggestField'
import {Grid, TextField } from 'material-ui';

const DocHeader=({name,onNameChange,date,onDateChange,to})=>{
  return (
    <Grid container  alignItems="flex-end" >
      <Grid item lg={1}  >
        <Grid container justify='flex-start'><img src={logo} alt="logo" className='logo-doc' /></Grid>
      </Grid>
      <Grid item lg={11}  >
        <Grid container direction="column" alignItems="flex-end"  >
          <Grid container justify="flex-end">
            <Grid item lg={3} >
              <DateClick 
                value={date} 
                onChange={onDateChange}
                beforeText='Chihuahua, Chih., a '
              /> 
            </Grid>
          </Grid>
          <Grid item lg={3} >
            <TextField 
              value={name} 
              onChange={onNameChange}
              className="align-right bold"
            /> 
          </Grid>
        </Grid>
      </Grid>
      <Grid container  justify="flex-start" direction="column" className='greeting bold'  >
        <Grid item >
          <Grid item ><AutosuggestField /></Grid>
          <Grid item >{to.name.title} {to.name.full}</Grid>
          <Grid item >{to.job_title}</Grid>
          <Grid item >{to.institution}</Grid>
          <Grid item >Presente</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
DocHeader.propTypes={
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
}

export default DocHeader;
