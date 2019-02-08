import { loadDB } from '../../lib/db'
import { extend, omit } from 'lodash'
import { FETCH_MEMBERS, ADD_MEMBER, REMOVE_MEMBER, UPDATE_MEMBER } from './types'

// ACTIONS

// This sets up the listener to fetch members.
// Sets a listener so as new posts fill in their are added to the top.
export const fetchMembers = () => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('members')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      let newState = []

      snapshot.forEach(function(doc) {
        newState.push(extend({ id: doc.id }, doc.data()))
      })

      dispatch({
        type: FETCH_MEMBERS,
        payload: newState
      })
    })
}

export const updateMember = data => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('members')
    .doc(data.id)
    .update(omit(data, ['id']))
    .then(doc => {
      dispatch({
        type: UPDATE_MEMBER
      })

      return { data, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}

export const deleteMember = memberId => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('members')
    .doc(memberId)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_MEMBER
      })

      return { data: memberId, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}

export const createMember = data => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('members')
    .doc(data.id)
    .set(
      extend(omit(data, ['id']), {
        createdAt: app.firestore.FieldValue.serverTimestamp()
      }),
      { merge: true }
    )
    .then(doc => {
      dispatch({
        type: ADD_MEMBER
      })

      return { data, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}
