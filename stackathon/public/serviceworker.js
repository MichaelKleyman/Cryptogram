// cache: storage of the browser: if i load something once, dont need to reload image everytime i go online, it is taken from the cache, faster and more effective
const cacheName = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];
const self = this; //'this' is the service worker itself
// //offline.html is the page shown when the app has no internet connection

// //install the service worker
self.addEventListener('install', (event) => {
  //open the cache and add the files to the cache
  event.waitUntil(
    //tells the browser that work is going on until the promise is resolved and that it shouldnt terminate the service worker
    caches.open(cacheName).then((cache) => {
      console.log('Opened cache');
      //takes the array if string URLS and adds them to the cache
      return cache.addAll(urlsToCache);
    })
  );
});

// //listen for requests
self.addEventListener('fetch', (event) => {
  try {
    //respond with something when we notice a fetch request
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).catch(() => caches.match('offline.html'));
        //if it gets here it means theres no internet connection
      })
    );
  } catch (error) {
    console.error('MY ERROR: ', error);
  }
});

//activate the service worker
self.addEventListener('activate', (event) => {
  //in the activation you gotta remove all the previous caches and just keep the new one, because there is going to be alot of versions of the cache
  //and it will get changed often so storing it all in the cache isnt needed
  const cacheWhitelist = [];
  cacheWhitelist.push(cacheName);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
            //this is basically deleting all the previous versions but keeps the cacheName from the top of the file.
            //so whenever something is updated/changed it is only keeping the version1 cache name
          }
        })
      )
    )
  );
});
