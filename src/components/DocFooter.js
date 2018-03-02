import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'material-ui';

const  DocFooter =({ address})=>{
  return (
    <Grid container justify="flex-end" direction='column' alignItems='flex-end' >
      <Grid item lg={2}>{ address.street }</Grid> 
      <Grid item lg={2}>{ address.colony }</Grid> 
      <Grid item lg={2}>{ address.city }</Grid> 
      <Grid item lg={2}>{ address.zip }</Grid> 
    </Grid>
  )
}
DocFooter.propTypes={
  address: PropTypes.object.isRequired,
}
export default DocFooter;
