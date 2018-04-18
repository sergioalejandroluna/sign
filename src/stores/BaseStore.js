import axios from 'axios'
class BaseStore  {
  isAuthenticated= this.getLocal('auth')==='true';
  email=this.getLocal('email')
  token=this.getLocal('token')
  constructor(){
    const API_URL=process.env.REACT_APP_API
    this.axios=axios.create({
      baseURL: API_URL,
      timeout: 10000,
    });
    this.setGlobalHeaders();
  }

  setGlobalHeaders(){
    axios.defaults.headers.common['Email'] = this.email;
    axios.defaults.headers.common['Token'] = this.token;
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
}
export default BaseStore; 
