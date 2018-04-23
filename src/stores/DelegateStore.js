
import BaseStore from './BaseStore'
import * as qs from 'query-string';

class DelegateStore extends BaseStore {
  add(user) {
    return this.axios.post('/delegate', {delegate_id: user.id})
  }
  remove(user) {
    return this.axios.delete('/delegate/'+user.delegate_id)
  }
  list(){
    return this.axios.get('/delegate')
  }
}
export default (new DelegateStore())
