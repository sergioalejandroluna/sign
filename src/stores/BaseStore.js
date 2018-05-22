import axios from 'axios';

class BaseStore  {
  isAuthenticated= this.getLocal('auth')==='true';
  constructor(){
    this.axios=axios.create({
      baseURL: this.api_url(),
      timeout: 10000,
    });
    this.setGlobalHeaders();
    if(this.isAuthenticated){
      const ActionCable = require('actioncable')
      const url=`ws://${this.api_domain()}/live?email=${this.email()}&token=${this.token()}`
      this.cable=ActionCable.createConsumer(url); 
    }
  }

  api_domain(){
    const url= new URL(this.api_url())
    return url.host;
  }

  api_url(){
    return  process.env.REACT_APP_API; 
  }

  token(){
    return this.getLocal('token');
  }

  email(){
    return this.getLocal('email')
  }

  setGlobalHeaders(){
    axios.defaults.headers.common['Email'] = this.email();
    axios.defaults.headers.common['Token'] = this.token();
  }

  saveLocal(key,object){
    localStorage.setItem(key, object);
  }

  getLocal(key){
    return localStorage.getItem(key)
  }

  popLocal(key){
    const local=this.getLocal(key)
    localStorage.removeItem(key)
    return local;
  }

  error(error) {
    console.error(error)
  }
  isAuth(){
    return this.isAuthenticated
  }
}
export default BaseStore; 
