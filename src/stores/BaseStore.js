import axios from 'axios'
import { observable, action } from 'mobx'
class BaseStore  {
  @observable state = "pending" // "pending" / "done" / "error"  
  constructor(){
    const API_URL=process.env.REACT_APP_API
    this.axios=axios.create({
      baseURL: API_URL,
      timeout: 1000,
    });
  }

  @action.bound
  error(error) {
    console.error(error)
    this.state = "error"
  }
}
export default BaseStore; 
