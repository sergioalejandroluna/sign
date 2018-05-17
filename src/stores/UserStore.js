import BaseStore from './BaseStore'
import * as qs from 'query-string';

class UserStore extends BaseStore { 

  authenticate(cb) {
    const API_URL=process.env.REACT_APP_API
    window.location.replace(API_URL+'/users/auth/google_oauth2')
  }

  signout() {
    return new Promise((resolve,reject)=>{
      this.popLocal('email')
      this.popLocal('auth')
      this.isAuthenticated = false
      this.setGlobalHeaders()
      this.unsubscribe_notification()
      resolve(this.isAuthenticated)
    })
  }

  get(id){
    return this.axios.get('/users/'+id)
  }

  info(){
    return {
      name: this.getLocal('name'),
      photo: this.getLocal('photo'),
      email: this.getLocal('email'),
    }
  }

  fetchLoginUser(search){
    return new Promise((resolve,reject)=>{
      const parsed = qs.parse(search);
      if (parsed.token!==undefined && parsed!==undefined){
        this.saveLocal('token',parsed.token)
        this.saveLocal('email',parsed.email)
        this.saveLocal('photo',parsed.photo)
        this.saveLocal('name',parsed.name)
        this.setGlobalHeaders()
      }
      this.isAuthenticated=parsed.email!==undefined
      this.saveLocal('auth',this.isAuthenticated)
      resolve(this.isAuthenticated)
    })
  }

  unsubscribe_notification(){
    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.getSubscription().then(function(subscription) {
        subscription.unsubscribe().then(function(successful) {
          // You've successfully unsubscribed
        }).catch(function(e) {
          // Unsubscription failed
        })
      })        
    });
  }

  subscribe_notification(){
    const axios= this.axios;
    //setup the push notification with a vapid key
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.pushManager.getSubscription()
        .then(async function(subscription) {
          if (subscription) {
            return subscription;
          }
          const response = await axios('/vapid_public_key');
          const vapidPublicKey = await response.data;
          const convertedVapidKey = new Uint8Array(vapidPublicKey);
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          }).then(subscription=>{
            axios.patch('/users/subscribe_notification', {
              subscription: subscription,
              message: 'You clicked a button!'
            });
            return subscription;
          });
        });
    })
  }

  setDelegate(delegate){
  }

  removeDelegate(delegate){
  }

  getDelegates(){
  }

  search(str){
    return this.axios.get('/users',{
      params:{q:str}
    })
  }
}
export default (new UserStore())
