import { combineReducers } from 'redux'
import user from './user'
import members from './members'

const rootReducer = combineReducers({
  user,
  members
})

export default rootReducer
