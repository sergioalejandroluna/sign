import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from 'material-ui';
import sign from '../sign-sample.png'

const  DocFooter =({ address,classes})=>{

  return (
    <Grid container >
      <Grid container  >
        <Grid item  className='bold'  >
          <Grid item>Atentamente</Grid>
          <Grid item><img src={sign} alt="logo"  /></Grid>
          <Grid item>M.F Manuel Alfonso Palicio Guevara</Grid>
          <Grid item>Jefe departamento de bienes patrimoniales</Grid>
        </Grid>
      </Grid>
      <Grid container justify="flex-end"  >
        <Grid item  >
          <Grid item className='bold' >Dirección Administrativa</Grid>
          <Grid item >{ address.street }</Grid>
          <Grid item >{ address.colony }</Grid>
          <Grid item >{ address.city }</Grid>
          <Grid item >{ address.zip }</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
DocFooter.propTypes={
  address: PropTypes.object.isRequired,
}
export default DocFooter;
