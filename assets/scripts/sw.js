workbox.skipWaiting();
workbox.clientsClaim();


// Google Fonts
// You can use a cache first strategy to cache the Google Fonts in your page.
// Here we've limited the cache to 30 entries to ensure we don't balloon a users device.

workbox.routing.registerRoute(

  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),

  workbox.strategies.cacheFirst({

    cacheName: 'echebaby-google-fonts',

    plugins: [

      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),

      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);


// Caching Images
// You can capture and caching images with a
// cache first strategy based on the extension.

workbox.routing.registerRoute(

  /\.(?:png|gif|jpg|jpeg|svg)$/,

  workbox.strategies.cacheFirst({

    cacheName: 'echebaby-images',

    plugins: [

      new workbox.expiration.Plugin({

        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
