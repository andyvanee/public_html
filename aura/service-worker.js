const CACHE_NAME = 'aura-cache-v1'
const urlsToCache = [
    './',
    './index.html',
    './main.css',
    './entrypoint.js',
    './favicon.svg',
    './assets/aura-cover.jpeg',
    './manifest.json',
]

// Install service worker and cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        }),
    )
})

// Cache and return requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response
            }
            return fetch(event.request).then((response) => {
                // Return the response
                return response
            })
        }),
    )
})

// Update the service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                }),
            )
        }),
    )
})
