import BaseStore from './BaseStore'

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
  getUsersOnBehalf(){
    return this.axios.get('/delegate/behalf')
  }
}
export default (new DelegateStore())
