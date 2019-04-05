import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import config from '../utils/config'

export function loadDB() {
  let app
  try {
    app = firebase.initializeApp(config.database)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    } else {
      app = firebase
    }
  }

  return app
}
