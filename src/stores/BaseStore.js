import axios from 'axios';
import ActionCable from 'actioncable';

class BaseStore  {
  isAuthenticated= this.getLocal('auth')==='true';
  constructor(){
    this.axios=axios.create({
      baseURL: this.api_url(),
      timeout: 10000,
    });
    if(this.isAuthenticated){
      this.setGlobalHeaders();
    }
  }


  cable(){
    if (this.cableConsumer===undefined){
      const proto= window.location.protocol==='https:' ? 'wss' : 'ws'
      const url=`${proto}://${this.api_domain()}/live?email=${this.email()}&token=${this.token()}`
      this.cableConsumer=ActionCable.createConsumer(url); 
    }
    return this.cableConsumer
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
