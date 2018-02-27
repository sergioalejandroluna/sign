import { mobx,observable,computed } from 'mobx'
import initialState,{initialDoc} from './initialState'

class DocStore{
  @observable docs=[];

  constructor(){
    this.docs=initialState;
  }
  getDoc(id){
    let foundIndex=this.docs.findIndex(x=>x.id===id)
    if(id==-1)
      return null;
    return this.docs[foundIndex];
  }
  @computed addDoc(){
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
    let doc=getDoc(id)  
    doc[field]=value
    setDoc(doc)
  }

}
exports default DocStore;
