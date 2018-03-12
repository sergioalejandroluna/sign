import axios from 'axios'
class BaseStore  {
  constructor(){
    const API_URL=process.env.REACT_APP_API
    this.axios=axios.create({
      baseURL: API_URL,
      timeout: 10000,
    });
  }

  error(error) {
    console.error(error)
  }
}
export default BaseStore; 
