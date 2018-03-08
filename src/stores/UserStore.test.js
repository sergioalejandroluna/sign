import UserStore from './UserStore'
import db from '../db.js'
const data=db()
it('should get current User', function(done) {
  UserStore.fetchLoginUser().then((r)=>{
    expect(r.data).toEqual(data.login_user)
    done();
  } );
})
it('should get  User by id', function(done) {
  UserStore.get(3).then((r)=>{
    expect(r.data).toEqual(data.users[2])
    done();
  } );
})
it('should find users with arkh data', function(done) {
  UserStore.search('arkh').then((r)=>{
    expect(r.data).toEqual([ data.users[3], data.users[8] ])
    done();
  } );
})
