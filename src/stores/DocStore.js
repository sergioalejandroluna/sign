import BaseStore from './BaseStore'

class DocStore extends BaseStore{

  inbox(){
    return this.axios.get('/docs?inbox=1').catch(this.error)
  }
  draft(){
    return this.axios.get('/docs?draft=1').catch(this.error)
  }
  sent(){
    return this.axios.get('/docs?sent=1').catch(this.error)
  }
  signed(){
    return this.axios.get('/docs?signed=1').catch(this.error)
  }

  getDoc(id){
    if (id===undefined)
      return this.axios.get('/docs/new').catch(this.error)
    return this.axios.get('/docs/'+id).catch(this.error)
  }

  addDoc(doc){
    return this.axios.post('/docs',doc ).catch(this.error)
  }

  setDoc(doc){
    return this.axios.put('/docs/'+doc.id,doc )
  }

  save(doc){
    if(doc.to.id===null || doc.folio===''){
      return new Promise((resolve,reject)=>{
        resolve({data: doc })
      })}
    if (doc.id===undefined){
      return this.addDoc(doc) 
    }else{
      return this.setDoc(doc)
    }
  }

  send_or_sign(doc){
    if (this.email()===doc.from.email)
      return this.axios.patch('/docs/'+doc.id+'/send' ).catch(this.error)
    return this.axios.patch('/docs/'+doc.id+'/request_sign' ).catch(this.error)
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
