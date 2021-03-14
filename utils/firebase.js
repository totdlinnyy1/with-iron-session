import firebase from 'firebase/app'
import 'firebase/storage'

export const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // eslint-disable-next-line no-undef
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // eslint-disable-next-line no-undef
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // eslint-disable-next-line no-undef
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // eslint-disable-next-line no-undef
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // eslint-disable-next-line no-undef
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // eslint-disable-next-line no-undef
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // eslint-disable-next-line no-undef
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const app = firebase.app()
const storage = firebase.storage()
export {app, storage}

console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(')
