import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers'

const exampleInitialState = {
  members: []
}

export default function (initialState = exampleInitialState, context) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
