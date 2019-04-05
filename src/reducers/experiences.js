import { FETCH_EXPERIENCES } from '../actions/types'

const initialState = []

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPERIENCES:
      return [].concat(action.payload)
    default:
      return state
  }
}
