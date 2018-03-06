import React from 'react'
import PropTypes from 'prop-types'
import logo from '../logo.png';
import DateClick from './DateClick'
import {Grid } from 'material-ui';

const DocHeader=({name,onNameChange,date,onDateChange})=>{
  return (
    <Grid container  alignItems="flex-end" >
      <Grid item lg={1}  >
        <Grid container justify='flex-start'><img src={logo} alt="logo" className='logo-doc' /></Grid>
      </Grid>
      <Grid item lg={11}  >
        <Grid container justify="flex-end" >
          <Grid item lg={12} >
            <DateClick 
              value={date} 
              onChange={onDateChange}
              beforeText='Chihuahua, Chih., a '
            /> 
          </Grid>
        </Grid>
      </Grid>
      <Grid container  justify="flex-start" direction="column" className='greeting bold'  >
        <Grid item >
            <Grid item >M.I.D. Miguel Ángel López Santillán</Grid>
            <Grid item >Coordinador General de Tecnologías de Información</Grid>
            <Grid item >Universidad Autónoma de Chihuahua</Grid>
            <Grid item >Presente</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
DocHeader.propTypes={
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default DocHeader;
