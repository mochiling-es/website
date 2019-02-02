import { combineReducers } from 'redux'
import user from './user'
import members from './members'
import experiences from './experiences'

const rootReducer = combineReducers({
  user,
  members,
  experiences
})

export default rootReducer
