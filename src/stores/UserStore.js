import BaseStore from './BaseStore'
import * as qs from 'query-string';

class UserStore extends BaseStore { 

  authenticate(cb) {
    window.location.replace('http://lvh.me:3001/users/auth/google_oauth2')
  }

  signout(cb) {
    this.popLocal('token')
    this.popLocal('email')
    this.popLocal('auth')
    this.isAuthenticated = false
    this.email=null
    this.token=null
    this.setGlobalHeaders()
  }

  get(id){
    return this.axios.get('/users/'+id)
  }

  fetchLoginUser(search){
    return new Promise((resolve,reject)=>{
      const parsed = qs.parse(search);
      if (parsed.token!==undefined && parsed!==undefined){
        this.token=parsed.token
        this.email=parsed.email
        this.saveLocal('token',parsed.token)
        this.saveLocal('email',parsed.email)
        this.setGlobalHeaders()
      }
      this.isAuthenticated=parsed.email!==undefined
      this.saveLocal('auth',this.isAuthenticated)
      resolve(this.isAuthenticated)
    })
  }

  search(str){
    return this.axios.get('/users',{
      params:{q:str}
    })
  }
}
export default (new UserStore())
