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

  uploadFile(doc_id,file){
    if (file) {
      const data = new FormData();
      data.append('file', file);
      return this.axios.put(`/docs/${doc_id}/add_file`,data, 
        {onUploadProgress: e=>{
          const percentCompleted = Math.round( (e.loaded * 100) / e.total );
          console.log(percentCompleted)
        }} );
    }
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
    if (doc.id===undefined || doc.id===null){
      const {from, to, address, created_by, date, body} = doc
      return this.addDoc({from_id: from.id, to_id: to.id,
        address_id: address.id, created_by_id: created_by.id, date: date, body: body}) 
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
