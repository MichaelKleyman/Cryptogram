/* eslint-disable no-undef */
// const urlsToCache = ['index.html', 'offline.html'];

// //activate the service worker
// self.addEventListener('activate', (event) => {
//   //in the activation you gotta remove all the previous caches and just keep the new one, because there is going to be alot of versions of the cache
//   //and it will get changed often so storing it all in the cache isnt needed
//   const cacheWhitelist = [];
//   cacheWhitelist.push(cacheName);

//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//             //this is basically deleting all the previous versions but keeps the cacheName from the top of the file.
//             //so whenever something is updated/changed it is only keeping the version1 cache name
//           }
//         })
//       )
//     )
//   );
// });

// cache: storage of the browser: if i load something once, dont need to reload image everytime i go online, it is taken from the cache, faster and more effective
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const CACHE = 'version-1';
const self = this;
//'this' is the service worker itself
//offline.html is the page shown when the app has no internet connection

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = 'offline.html';

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

//install the service worker
self.addEventListener('install', async (event) => {
  //tells the browser that work is going on until the promise is resolved and that it shouldnt terminate the service worker
  event.waitUntil(
    //open the cache and add the files to the cache
    //takes the array if string URLS and adds them to the cache
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
    //if it gets here it means theres no internet connection
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

//listen for requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    //respond with something when we notice a fetch request
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});
