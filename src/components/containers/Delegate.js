import React from 'react';
import { Grid, IconButton,Avatar } from 'material-ui';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { AddCircle, RemoveCircle } from 'material-ui-icons';
import SearchUserField from '../SearchUserField'
import DelegateStore from '../../stores/DelegateStore'

class Delegate extends React.Component{
  emptyUser={ name:{full:'', title: ''}, email: ''}
  state={
    currentUser: this.emptyUser,
    users:[]
  }

  componentDidMount(){
    DelegateStore.list().then((r)=>{
      this.setState({users: r.data}) 
    })
  }

  render(){
    const {users, currentUser} = this.state
    return (
      <Grid container >
        <Grid item lg={11} ><SearchUserField to={currentUser} onChange={this.onUserChange} disabled={false}  /></Grid>
        <IconButton onClick={this.addUser} >
          <AddCircle />
        </IconButton>
        <Grid item lg={12}>
          <List>
            {users.map(u => (
              <ListItem key={u.id}>
                <Avatar alt="foto" src={u.photo} />
                <ListItemText primary={u.name.full} secondary={u.email} />
                <ListItemSecondaryAction>
                  <IconButton onClick={()=> this.removeUser(u) } >
                    <RemoveCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    )
  }

  onUserChange=(u)=>{
    this.setState({
      currentUser: u
    })
  } 
  addUser=()=>{
    const u= this.state.currentUser
    const hasUser= this.state.users.find(x => x.id===u.id)===undefined
    if (u.id!==undefined && hasUser){
      DelegateStore.add(u).then(r=>{
        u.delegate_id=r.data.id
        this.setState((prevState)=>{
          return {users: [...prevState.users,u], currentUser: this.emptyUser}
        });
      })
    }
  } 
  removeUser=(u)=>{
    DelegateStore.remove(u).then(r=>{
      this.setState((prevState)=>{
        return {users: prevState.users.filter(x=> x.id!==u.id)}
      });
    })
  } 
}

Delegate.propTypes={
}
export default Delegate;
