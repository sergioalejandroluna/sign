import React from 'react'
import PropTypes from 'prop-types'
import {Grid, IconButton } from 'material-ui';
import { SupervisorAccount } from 'material-ui-icons';
import {ChooseAccount} from './DocDialogs';
import DelegateStore from "../stores/DelegateStore"

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

class  DocFooter extends React.Component{
  state={
    open: false ,
    users: []
  }

  componentDidMount(){
    DelegateStore.getUsersOnBehalf().then(r=>{
      this.setState({users: r.data})
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.address.id!==nextProps.address.id) || 
      (this.props.from.id!==nextProps.from.id) || (this.props.created_by.id!==nextProps.created_by.id) 
      || (this.state.open!==nextState.open)|| (this.state.users.length!==nextState.users.length) || nextProps.disabled!==this.props.disabled;
  }

  openDialog=()=>{
    this.setState({open:true})
  }
  closeDialog = () => {
    this.setState({open: false})
  };
  handleSelect = (user) => {
    this.props.onSwitchFrom(user)
    this.closeDialog();
  };

  render(){
    const { address,from,created_by, disabled}= this.props
    const {open, users}= this.state
    return (
      <Grid container style={style}>
        <Grid container  >
          <Grid item lg={4} className='bold'  >
            <Grid item>Atentamente</Grid>
            <Grid item><img src={from.signature} alt="sign" style={{ maxWidth: '100%' }}/></Grid>
            <Grid item>{from.name.title+' '+from.name.full}
              { users.length>1 && !disabled  ?
                  <IconButton onClick={this.openDialog}  >
                    <SupervisorAccount />
                  </IconButton>
                  : null}
                </Grid>
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
            <ChooseAccount open={open}  handleClose={this.closeDialog} handleSelect={this.handleSelect} users={users} />
          </Grid>
    )
  }
}

DocFooter.propTypes={
  address: PropTypes.object.isRequired,
  from: PropTypes.object.isRequired,
  created_by: PropTypes.object.isRequired,
  onSwitchFrom: PropTypes.func.isRequired,
}
export default DocFooter;
