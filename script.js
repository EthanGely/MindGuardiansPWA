navigator.serviceWorker.ready
    .then(function (registration) {
        // Use the PushManager to get the user's subscription to the push service.
        return registration.pushManager.getSubscription()
            .then(async function (subscription) {
                // If a subscription was found, return it.
                if (subscription) {
                    return subscription;
                }

                // Get the server's public key
                const response = await fetch('https://ethan-server.com:8443/vpk');
                const vapidPublicKey = await response.text();
                // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
                // urlBase64ToUint8Array() is defined in /tools.js
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                // send notifications that don't have a visible effect for the user).
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            });
    }).then(function (subscription) {
        // Send the subscription details to the server using the Fetch API.
        fetch('https://ethan-server.com:8443/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription
            }),
        });
    });

function urlBase64ToUint8Array(base64String) {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
      if (data) {
        const title = data.title;
        const payload = data.payload;
        const image = data.image;
  
        if (title && payload && image) {
          event.waitUntil(
            self.registration.showNotification(title, {
              body: payload,
              icon: image,
            })
          );
        }
      }
    }
  });