import { observable } from 'mobx'
import initialState,{initialDoc} from './initialState'

class DocStore{
  @observable docs=initialState.docs;

  constructor(){
    this.docs=initialState.docs;
  }
  getDoc(id){
    if (id===undefined)
      return this.docs.slice(-1)[0]
    //cast to int
    id=~~id
    let foundIndex=this.docs.findIndex(x=>x.id===id)
    return this.docs[foundIndex];
  }
  addDoc(){
    let init= initialDoc()
    init.id=this.docs.length+1
    this.docs=[...this.docs,init]
    return init;
  }

  setDoc(doc){
    let foundIndex=this.docs.findIndex(x=>x.id===doc.id)
    this.docs[foundIndex]=doc
  }

  changeDocField(id,field,value){
    let doc=this.getDoc(id)  
    doc[field]=value
    this.setDoc(doc)
  }

  deleteDoc(id){
    let foundIndex=this.docs.findIndex(x=>x.id===id)
    this.docs.splice(foundIndex,1)
  }

}
const docStore=new DocStore();
export {docStore};
