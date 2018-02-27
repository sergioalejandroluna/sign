import { docStore } from './DocStore'
import initialState,{initialDoc} from './initialState'


it('should have getDocs', function() {
  expect(docStore.docs.length).toBe(initialState.docs.length)
})
it('should add a doc', function() {
  const docs= [...docStore.docs,initialDoc()]
  docStore.addDoc();
  expect(docStore.docs.length).toBe(docs.length)
})
it('should edit a doc', function() {
  let doc=initialState.docs[3];
  doc.name='1212'
  doc.cc='dsf'
  docStore.setDoc(doc)
  expect(docStore.docs[3]).toEqual(doc)
})
it('should delete a doc', function() {
  let docs=[...docStore.docs ]
  docs.splice(2,1);
  docStore.deleteDoc(3)
  expect([ ...docStore.docs ]).toEqual(docs)
})
