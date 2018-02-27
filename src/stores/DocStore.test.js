import DocStore from './DocStore'
import initialState,{initialDoc} from './initialState'


const store= new DocStore()
it('should have getDocs', function() {
  expect(store.getDocs()).toBe(initialState.docs)
})
