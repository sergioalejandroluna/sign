import axios from 'axios'
class BaseStore  {
  isAuthenticated= false;
  constructor(){
    const API_URL=process.env.REACT_APP_API
    this.axios=axios.create({
      baseURL: API_URL,
      timeout: 10000,
    });
  }

  saveLocal(key,object){
    localStorage.setItem(key, JSON.stringify(object));
  }

  getLocal(key){
    return JSON.parse(localStorage.getItem(key))
  }

  error(error) {
    console.error(error)
  }
}
export default BaseStore; 
