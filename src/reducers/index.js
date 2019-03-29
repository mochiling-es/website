import { combineReducers } from 'redux'
import user from './user'
import members from './members'
import experiences from './experiences'
import proposals from './proposals'
import features from './features'

const rootReducer = combineReducers({
  user,
  members,
  experiences,
  proposals,
  features
})

export default rootReducer
