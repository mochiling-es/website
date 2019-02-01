import { USER_UPDATED, USER_LOGOUT, USER_ERROR } from '../actions/types'

const initialState = {
  state: 'idle',
  email: null,
  displayName: null,
  emailVerified: null,
  photoURL: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_UPDATED:
      return {
        ...state,
        ...action.payload
      }

    case USER_LOGOUT:
      return {
        ...initialState
      }

    case USER_ERROR:
      return {
        ...initialState,
        ...action.payload
      }

    default:
      return state
  }
}
