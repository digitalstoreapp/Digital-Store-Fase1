/* firebase-messaging-sw.js
   Service worker DEDICADO solo para recibir notificaciones push en segundo
   plano (cuando el navegador está cerrado o la pestaña no está activa).
   No toca caché ni nada de lo que hace tu sw.js normal — son independientes.
   Sube este archivo tal cual a la raíz del repo (mismo lugar que index.html). */

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD8BhxfSPDmeCR2g1JyyqtV0Qt2Q4d_DfE",
  authDomain: "digital-store-64852.firebaseapp.com",
  projectId: "digital-store-64852",
  storageBucket: "digital-store-64852.firebasestorage.app",
  messagingSenderId: "917570011101",
  appId: "1:917570011101:web:e6e58de0fbfc154d744034"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Digital Store', {
    body: n.body || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
