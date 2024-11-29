self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json();
  
      if (data) {
        const title = data.title;
        const payload = data.payload;
        const image = data.image;
  
        if (title && payload && image) {
          // Keep the service worker alive until the notification is created.
          event.waitUntil(
            // Show a notification with title 'ServiceWorker Cookbook' and use the payload
            // as the body.
            self.registration.showNotification(title, {
              body: payload,
              icon: image,
            })
          );
        }
      }
    }
  });