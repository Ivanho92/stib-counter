const CACHE_NAME = "version-7";
const BASE_URL = location.origin;
const CACHED_FILES = [
  `${BASE_URL}/offline.html`,
  `${BASE_URL}/favicon32.png`,
  `${BASE_URL}/logo512.png`,
  `${BASE_URL}/static/js/bundle.js`,
  `${BASE_URL}/static/media/roboto-latin-300-normal.c48fb6765a9fcb00b330.woff2`,
  `${BASE_URL}/static/media/roboto-latin-400-normal.b009a76ad6afe4ebd301.woff2`,
  `${BASE_URL}/static/media/roboto-latin-500-normal.f25d774ecfe0996f8eb5.woff2`,
];

const ENABLE_LOGS = false;

self.addEventListener("install", (event) => {
  // Permet d'activer instantanément le nouveau Service Worker
  // Bypass l'étape "waiting" du lifecycle
  self.skipWaiting();

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CACHED_FILES);
    })(),
  );

  ENABLE_LOGS &&
    (console.log(""),
    console.groupCollapsed(`${CACHE_NAME} INSTALLED`),
    console.log(event),
    console.groupEnd());
});

self.addEventListener("activate", (event) => {
  // Permet au Service Worker de prendre directement le contrôle sur la page
  // (pratique pour quelqu'un qui visite le site pour la première fois)
  clients.claim();

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      // Promise.all avec map => explication ci-dessous
      // https://www.techiediaries.com/promise-all-map-async-await-example/
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    })(),
  );

  ENABLE_LOGS &&
    (console.log(""),
    console.groupCollapsed(`${CACHE_NAME} ACTIVATED`),
    console.log(event),
    console.groupEnd());
});

self.addEventListener("fetch", (event) => {
  ENABLE_LOGS &&
    (console.log(""),
    console.groupCollapsed(
      `${CACHE_NAME} FETCHING: ${event.request.url} (mode: ${event.request.mode})`,
    ),
    console.log(event),
    console.log(
      `URL (event.request.url): %c${event.request.url}`,
      "background-color: blue",
    ),
    console.log(
      `Mode (event.request.mode): %c${event.request.mode}`,
      "background-color: blue",
    ),
    console.groupEnd());

  // Le mode "navigate" correspond aux intéractions de l'utilisateur sur le site web
  // Les autres modes (cors, no-cors) correspondent à des appels de ressources (img, api, favicon, fonts, ...)
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Ici on vérifie si la réponse a déja été préloadée par le navigateur
          // Si oui, alors on retourne cette réponse là
          const preloadResponse = await event.preloadResponse;
          ENABLE_LOGS && console.log({ preloadResponse });
          if (preloadResponse) {
            return preloadResponse;
          }

          // Si non, alors on tente d'accéder "normalement" à la ressource via le network
          const networkResponse = await fetch(event.request);
          ENABLE_LOGS && console.log({ networkResponse });
          return networkResponse;
        } catch (error) {
          // En cas d'erreur (probablement du au offline), alors on retourne une réponse prédéfinie
          // Par exemple => return new Response("Bonjour les gens");
          // Ou ...
          const cache = await caches.open(CACHE_NAME);
          return await cache.match("/offline.html");
        }
      })(),
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
});
