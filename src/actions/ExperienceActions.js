import { loadDB } from '../../lib/db'
import { extend, omit } from 'lodash'
import { FETCH_EXPERIENCES, REMOVE_EXPERIENCE, UPDATE_EXPERIENCE, ADD_EXPERIENCE } from './types'

// ACTIONS

// This sets up the listener to fetch experiences.
// Sets a listener so as new posts fill in their are added to the top.
export const fetchExperiences = () => async dispatch => {
  const app = await loadDB()

  app
    .firestore()
    .collection('experiences')
    .orderBy('startDate', 'desc')
    .onSnapshot(snapshot => {
      let newState = []

      snapshot.forEach(function(doc) {
        newState.push(extend({ id: doc.id }, doc.data()))
      })

      dispatch({
        type: FETCH_EXPERIENCES,
        payload: newState
      })
    })
}

export const updateExperience = data => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('experiences')
    .doc(data.id)
    .update(omit(data, ['id']))
    .then(doc => {
      dispatch({
        type: UPDATE_EXPERIENCE
      })

      return { data, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}

export const deleteExperience = experienceId => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('experiences')
    .doc(experienceId)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_EXPERIENCE
      })

      return { data: experienceId, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}

export const createExperience = data => async dispatch => {
  const app = await loadDB()

  return await app
    .firestore()
    .collection('experiences')
    .add(
      extend(omit(data, ['id']), {
        createdAt: app.firestore.FieldValue.serverTimestamp()
      })
    )
    .then(doc => {
      dispatch({
        type: ADD_EXPERIENCE
      })

      return { data, error: null }
    })
    .catch(error => {
      return { data: null, error }
    })
}
