import { FETCH_MEMBERS } from '../actions/types'

const initialState = []

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return [].concat(action.payload)
    default:
      return state
  }
}
