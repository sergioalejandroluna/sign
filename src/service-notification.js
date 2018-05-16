self.addEventListener('push', function(event) {

  if (event.data) {
    const pushData = event.data.json();
    event.waitUntil(new Promise(resolve =>{
      const { title, options } = pushData;
      options.icon='/favicon.ico';
      resolve(self.registration.showNotification(title, options));
    }));
  }
});
self.addEventListener('notificationclick', function(event) {
  let url = event.notification.data;
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(()=>{
    return clients.openWindow(url);
  });
});
