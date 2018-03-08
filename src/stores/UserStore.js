import BaseStore from './BaseStore'

class UserStore extends BaseStore { 
  get(id){
    return this.axios.get('/users/'+id)
  }

  fetchLoginUser(){
    return this.axios.get('/login_user').catch(this.error)
  }
  
  search(str){
    return this.axios.get('/users',{
      params:{q:str}
    })
  }
}
export default (new UserStore())
