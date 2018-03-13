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
  DocStore.delete(3).then(r =>{
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
it('should just save a doc if it has folio and to whom', function(done) {
  let doc=data.docs[1];
  doc.folio=''
  doc.to.job_title=''
  DocStore.save(doc).then(r =>{
    expect(r.data).toEqual(doc)
    done();
  })
  doc=data.docs[1];
  doc.folio='asdad'
  doc.to.job_title=''
  DocStore.save(doc).then(r =>{
    expect(r.data).toEqual(doc)
    done();
  })
  doc=data.docs[1];
  doc.folio=''
  doc.to.job_title='asdasd'
  DocStore.save(doc).then(r =>{
    expect(r.data).toEqual(doc)
    done();
  })
})

it('should add a doc if it has not had an id ', function(done) {
  let doc=data.docs[1];
  doc.id=undefined
  doc.folio='sad'
  doc.to.job_title='asdasd'
  DocStore.save(doc).then(r =>{
    expect(r.data.id).toEqual(data.docs.length+1)
    done();
    return DocStore.delete(r.data.id)
  })
})
