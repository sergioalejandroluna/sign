import React from 'react'
import PropTypes from 'prop-types'
import {Grid } from 'material-ui';

const style={
  margin: '0 0 1em',
}

function same_dude(from, created_by){
  if (from.id===created_by.id)
    return null;
  return (
    <Grid item >
      <Grid item >Creado por: </Grid>
      <Grid item  >{ created_by.email }</Grid>
    </Grid>)
}

const  DocFooter =({ address,from,created_by})=>{

  return (
    <Grid container style={style}>
      <Grid container  >
        <Grid item lg={4} className='bold'  >
          <Grid item>Atentamente</Grid>
          <Grid item><img src={from.signature} alt="sign" style={{ maxWidth: '100%' }}/></Grid>
          <Grid item>{from.name.title+' '+from.name.full}</Grid>
          <Grid item>{from.job_title}</Grid>
          <Grid item>{from.institution}</Grid>
          <Grid item>{from.email}</Grid>
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
      {same_dude(from,created_by)}
    </Grid>
  )
}

DocFooter.propTypes={
  address: PropTypes.object.isRequired,
  from: PropTypes.object.isRequired,
  created_by: PropTypes.object.isRequired,
}
export default DocFooter;
