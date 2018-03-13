import BaseStore from './BaseStore'
import { newDoc } from '../db'

class DocStore extends BaseStore{

  fetchDocs(){
    return this.axios.get('/docs').catch(this.error)
  }

  getDoc(id){
    if (id===undefined)
      return new Promise((resolve,reject)=>{
        resolve({ data:newDoc() })
      })
    return this.axios.get('/docs/'+id).catch(this.error)
  }

  addDoc(doc){
    return this.axios.post('/docs',doc ).catch(this.error)
  }


  save(doc){
    if(doc.to.job_title==='' || doc.folio===''){
      return new Promise((resolve,reject)=>{
        resolve({data: doc })
      })}
    if (doc.id===undefined){
      return this.addDoc(doc)
    }else{
      return this.setDoc(doc)
    }
  }

  setDoc(doc){
    return this.axios.put('/docs/'+doc.id,doc ).catch(this.error)
  }

  changeDocField(id,field,value){
    let doc=this.getDoc(id)  
    doc[field]=value
    this.setDoc(doc)
  }

  delete(id){
    return this.axios.delete('/docs/'+id )
  }

}
export default (new DocStore())
