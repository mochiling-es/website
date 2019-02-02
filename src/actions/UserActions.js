import { USER_UPDATED, USER_LOGOUT, USER_ERROR } from './types'

// ACTIONS

export const loginUser = data => async dispatch => {
  dispatch({
    type: USER_UPDATED,
    payload: data
  })
}

export const logoutUser = data => async dispatch => {
  dispatch({
    type: USER_LOGOUT
  })
}

export const errorUser = data => async dispatch => {
  dispatch({
    type: USER_ERROR,
    payload: data
  })
}
