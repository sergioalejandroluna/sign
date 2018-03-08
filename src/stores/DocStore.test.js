import DocStore from './DocStore'
import db from '../db.js'
const data=db()

it('should fetch some docs', function(done) {
  DocStore.fetchDocs().then(r =>{
    expect(r.data.length).toEqual(data.docs.length)
    done();
  })
})
it('should get a doc', function(done) {
  DocStore.getDoc(1).then(r =>{
    expect(r.data.id).toEqual(data.docs[0].id)
    done();
  })
})
it('should delete a doc', function(done) {
  DocStore.deleteDoc(3).then(r =>{
    expect(r.status).toEqual(200)
    done();
  })

})
it('should add a doc', function(done) {
  DocStore.addDoc(data.docs[2]).then(r =>{
    expect(r.status).toEqual(201)
    done();
  })
})
it('should edit a doc', function(done) {
  let doc=data.docs[1];
  doc.folio='1212'
  DocStore.setDoc(doc).then(r =>{
    expect(r.status).toEqual(200)
    done();
  })
})
