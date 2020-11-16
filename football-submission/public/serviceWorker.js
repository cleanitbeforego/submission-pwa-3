importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/serviceWorker.js', revision: '1' },
        { url: '/push.js', revision: '1' },
        { url: '/page/fav-team.html', revision: '1' },
        { url: '/page/match.html', revision: '1' },
        { url: '/page/team.html', revision: '1' },
        { url: '/assets/shell/nav-shell.html', revision: '1' },
        { url: '/assets/css/materialize.css', revision: '1' },
        { url: '/assets/css/style.css', revision: '1' },
        { url: './assets/images/bg.jpg', revision: '1' },
        { url: './assets/images/user/play.jpg', revision: '1' },
        { url: './assets/images/app/arrow-left-solid.svg', revision: '1' },
        { url: './assets/images/icons/icon512.png', revision: '1' },
        { url: './assets/images/icons/icon256.png', revision: '1' },
        { url: './assets/images/icons/icon128.png', revision: '1' },
        { url: './assets/images/icons/icon64.png', revision: '1' },
        { url: './assets/images/icons/icon32.png', revision: '1' },
        { url: './assets/images/icons/icon16.png', revision: '1' },
        { url: './assets/images/icons/jerman.png', revision: '1' },
        { url: './assets/js/api.js', revision: '1' },
        { url: './assets/js/DB.js', revision: '1' },
        { url: './assets/js/functions.js', revision: '1' },
        { url: './assets/js/idb.js', revision: '1' },
        { url: './assets/js/init.js', revision: '1' },
        { url: './assets/js/materialize.js', revision: '1' },
        { url:  './assets/js/script.js', revision: '1' },
 
        ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

//Response Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
} else {
    body = 'Push message no payload';
}
var options = {
    body: body,
    image: './assets/images/icons/icon32.png',
    badge: './assets/images/icons/jerman.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
  }
};
event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});