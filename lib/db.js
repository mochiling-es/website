import config from '../utils/config'

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

  return window.firebase
}