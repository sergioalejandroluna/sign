import BaseStore from './BaseStore'
import {initialDoc} from './initialState'

class DocStore extends BaseStore{

  fetchDocs(){
    return this.axios.get('/docs').catch(this.error)
  }

  getDoc(id){
    return this.axios.get('/docs/'+id).catch(this.error)
  }

  addDoc(doc){
    return this.axios.post('/docs',doc ).catch(this.error)
  }

  setDoc(doc){
    return this.axios.put('/docs/'+doc.id,doc ).catch(this.error)
  }

  changeDocField(id,field,value){
    let doc=this.getDoc(id)  
    doc[field]=value
    this.setDoc(doc)
  }

  deleteDoc(id){
    return this.axios.delete('/docs/'+id )
  }

}
export default (new DocStore())
