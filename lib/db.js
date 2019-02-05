import firebase from 'firebase/app'
import config from '../utils/config'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

export function loadDB() {
  try {
    firebase.initializeApp(config.database)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase
}
