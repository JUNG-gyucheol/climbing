importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
)

firebase.initializeApp({
  apiKey: 'AIzaSyCrtjqrtRug7VXCYIeExAMtj7690sIOhgA',
  authDomain: 'climbing-d5d04.firebaseapp.com',
  projectId: 'climbing-d5d04',
  storageBucket: 'climbing-d5d04.firebasestorage.app',
  messagingSenderId: '424515493689',
  appId: '1:424515493689:web:ea4e650e01c114c3cf92e8',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
