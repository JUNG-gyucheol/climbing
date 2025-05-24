import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
let messaging: Messaging | null = null

if (typeof window !== 'undefined') {
  try {
    messaging = getMessaging(app)
  } catch {
    console.log('Firebase messaging is not supported in this browser')
  }
}

export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      console.log('Firebase messaging is not supported in this browser')
      return null
    }

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications')
      return
    }

    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
      console.log('Token:', token)
      return token
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error)
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return
    console.log('onMessageListener')
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
