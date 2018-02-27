import DocStore from './DocStore'
import initialState,{initialDoc} from './initialState'


const store= new DocStore()
it('should have getDocs', function() {
  expect(store.getDocs().length).toBe(initialState.docs.length)
})
it('should add a doc', function() {
  const docs= [...store.getDocs(),initialDoc()]
  store.addDoc();
  expect(store.getDocs().length).toBe(docs.length)
})
it('should edit a doc', function() {
  let doc=initialState.docs[3];
  doc.name='1212'
  store.setDoc(doc)
  expect(store.getDocs()[3]).toEqual(doc)
})
