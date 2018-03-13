import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from 'material-ui';

const  DocFooter =({ address,from})=>{

  return (
    <Grid container >
      <Grid container  >
        <Grid item lg={4} className='bold'  >
          <Grid item>Atentamente</Grid>
          <Grid item><img src={from.signature} alt="sign" style={{ maxWidth: '100%' }}/></Grid>
          <Grid item>{from.name.title+' '+from.name.full}</Grid>
          <Grid item>{from.job_title}</Grid>
          <Grid item>{from.institution}</Grid>
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
  from: PropTypes.object.isRequired,
}
export default DocFooter;
