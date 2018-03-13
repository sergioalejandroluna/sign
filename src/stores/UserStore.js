import BaseStore from './BaseStore'

class UserStore extends BaseStore { 
  get(id){
    return this.axios.get('/users/'+id)
  }

  fetchLoginUser(){
    let current_user=this.getLocal('current_user')
    if (current_user===null){
      return this.axios.get('/login_user').then(r=>{
        this.saveLocal('current_user',r.data)
        return r.data
      })
    }
    return new Promise((resolve,reject)=>{
      resolve(current_user)
    })
  }
  
  search(str){
    return this.axios.get('/users',{
      params:{q:str}
    })
  }
}
export default (new UserStore())
