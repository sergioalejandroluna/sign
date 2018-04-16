import React from 'react'
import PropTypes from 'prop-types'
import { Logo } from '../img';
import DateClick from './DateClick'
import SearchUserField from './SearchUserField'
import {Grid, TextField } from 'material-ui';

const DocHeader=({doc,onFolioChange,onDateChange,onToChange,disabled})=>{
  const to=doc.to
  return (
    <Grid container spacing={0} alignItems="flex-end" >
      <Grid item lg={1}  >
        <Grid container justify='flex-start'><img src={Logo} alt="logo" className='logo-doc' /></Grid>
      </Grid>
      <Grid item lg={11}  >
        <Grid container direction="column" alignItems="flex-end"  >
          <Grid container justify="flex-end">
            <Grid item lg={3} >
              <DateClick 
                value={doc.date} 
                onChange={onDateChange}
                beforeText='Chihuahua, Chih., a '
                disabled={disabled}
              /> 
            </Grid>
          </Grid>
          <Grid item lg={3} >
            <TextField 
              value={doc.folio} 
              onChange={onFolioChange}
              className="align-right bold"
              disabled={disabled}
            /> 
          </Grid>
        </Grid>
      </Grid>
      <Grid container  justify="flex-start" direction="column" className='greeting bold'  >
        <Grid item lg={7} >
          <Grid item ><SearchUserField to={to} onChange={onToChange} disabled={disabled}  /></Grid>
          <Grid item >{to.job_title}</Grid>
          <Grid item >{to.institution}</Grid>
          <Grid item >Presente</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
DocHeader.propTypes={
  onDateChange: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired,
  onFolioChange: PropTypes.func.isRequired,
  onToChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default DocHeader;
