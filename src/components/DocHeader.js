import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field';
import logo from '../logo.png';
import DateClick from './DateClick'
import {Grid, List, ListItem} from 'material-ui';
const style={
  greeting:{
    paddingTop:'40px',
    fontWeight: 'bold'
  },
  logo:{
    width: '120px' 
  }
}

const DocHeader=({name,onNameChange,date,onDateChange})=>{
  return (
    <Grid container  alignItems="flex-end" >
      <Grid item lg={1}  >
        <Grid container justify='flex-start'><img src={logo} alt="logo" style={style.logo} /></Grid>
      </Grid>
      <Grid item lg={11}  >
        <Grid container justify="flex-end" >
          <Grid item >
            <DateClick 
              value={date} 
              onChange={onDateChange}
              beforeText='Chihuahua, Chih. , a '
            /> 
          </Grid>
        </Grid>
      </Grid>
      <Grid container  justify="flex-start" direction="column" style={ style.greeting }  >
        <Grid item >
          <List>
            <ListItem>M.I.D. Miguel Ángel López Santillán</ListItem>
            <ListItem>Coordinador General de Tecnologías de Información</ListItem>
            <ListItem>Universidad Autónoma de Chihuahua</ListItem>
            <ListItem>Presente</ListItem>
          </List> 
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
