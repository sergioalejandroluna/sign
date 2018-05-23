import React from 'react'
import PropTypes from 'prop-types'
import { Logo } from '../img';
import DateClick from './DateClick'
import SearchUserField from './SearchUserField'
import {Grid, TextField } from 'material-ui';
import {  Done } from 'material-ui-icons';

class DocHeader extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    const tprops=this.props
    return tprops.disabled!==nextProps.disabled || tprops.date!==nextProps.date ||
        tprops.folio!==nextProps.folio ||  tprops.to.id!==nextProps.to.id || tprops.readed!==nextProps.readed

  }

  render(){
    const {onDateChange,onToChange,disabled,to,date,folio,readed}=this.props
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
                  value={date} 
                  onChange={onDateChange}
                  beforeText='Chihuahua, Chih., a '
                  disabled={disabled}
                /> 
              </Grid>
            </Grid>
            <Grid item lg={3} >
              <TextField 
                value={folio} 
                className="align-right bold"
                disabled={true}
              /> 
            </Grid>
          </Grid>
        </Grid>
        <Grid container className='greeting' >
          <Grid item lg={8}   className='bold' >
            <Grid item ><SearchUserField to={to} onChange={onToChange} disabled={disabled}  /></Grid>
            <Grid item >{to.job_title}</Grid>
            <Grid item >{to.institution}</Grid>
            <Grid item >Presente</Grid>
          </Grid>
          <Grid item lg={4} >
            <Grid container justify="flex-end" alignItems="center" >
              <Grid item   >
                {readed ?  <Done style={{ fontSize: 36 }} titleAccess="Visto"  /> : null }
							</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
DocHeader.propTypes={
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  folio: PropTypes.string.isRequired,
  to: PropTypes.object.isRequired,
  onToChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  readed: PropTypes.bool.isRequired,
}

export default DocHeader;
