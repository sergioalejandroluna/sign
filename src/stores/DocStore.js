import BaseStore from './BaseStore'
class DocStore extends BaseStore{

  fetch(type='inbox',per=5, page=1){
    const params={}
    switch (type){
      case 'inbox':
        params.inbox=1
        break;
      case 'draft':
        params.draft=1
        break;
      case 'sent':
        params.sent=1
        break;
      case 'signed':
        params.signed=1
        break;
      default:
        break;

    }
    params.per=per
    params.page=page
    return this.axios.get('/docs', {params: params}).catch(this.error)
  }

  getReadedChannel(id,onMessage){
    return this.cable().subscriptions.create({channel: 'DocReadedChannel', id:id },{
      received: onMessage 
    }) 
  }

  getInboxChannel(onMessage){
    return this.cable().subscriptions.create({channel: 'InboxDocumentChannel', email:this.email() },{
      received: onMessage 
    }) 
  }

  getDoc(id){
    if (id===undefined)
      return this.axios.get('/docs/new')
    return this.axios.get('/docs/'+id)
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
      return this.axios.patch('/docs/'+doc.id+'/send' )
    return this.axios.patch('/docs/'+doc.id+'/request_sign' )
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
