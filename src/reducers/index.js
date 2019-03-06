import { combineReducers } from 'redux'
import user from './user'
import members from './members'
import experiences from './experiences'
import proposals from './proposals'

const rootReducer = combineReducers({
  user,
  members,
  experiences,
  proposals
})

export default rootReducer
