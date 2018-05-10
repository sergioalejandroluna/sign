self.addEventListener('push', function(event) {

  const sendNotification = push => {
    const { title, options } = push;
    options.icon='/favicon.ico'
    return self.registration.showNotification(title, options);
  };

  if (event.data) {
    const pushData = event.data.json();
    event.waitUntil(sendNotification(pushData));
  }
});
self.addEventListener('notificationclick', function(event) {
  let url = event.notification.data;
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
