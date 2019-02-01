import { loadDB } from '../../lib/db'
import { extend } from 'lodash'
import { FETCH_MEMBERS } from './types'

// ACTIONS

// This sets up the listener to fetch members.
// Sets a listener so as new posts fill in their are added to the top.
export const fetchMembers = () => async dispatch => {
  const db = await loadDB()

  db.firestore()
    .collection('members')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      let newState = []

      snapshot.forEach(function (doc) {
        newState.push(extend({ id: doc.id }, doc.data()))
      })

      dispatch({
        type: FETCH_MEMBERS,
        payload: newState
      })
    })
}
