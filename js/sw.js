'use strict'
var cacheStorageKey = 'minimal-pwa-9'
var cacheList = [
  '/',
  'index.html',
  'css/mobile.css',
  'css/global.css',
  'js/config.js',
  'js/toast.js',
  'js/cursor2.js',
  'js/beginning.js',
  'js/myjs.js',
  'manifest.json',
  'img/favicon.png'
]

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    }).then(function() {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      var fetchPromise = fetch(e.request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200) {
          var clone = networkResponse.clone()
          caches.open(cacheStorageKey).then(function(cache) {
            cache.put(e.request, clone)
          })
        }
        return networkResponse
      }).catch(function() {
        return cached
      })
      return cached || fetchPromise
    })
  )
})