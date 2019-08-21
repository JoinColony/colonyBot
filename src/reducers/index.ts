import { combineReducers } from 'redux'

import installsReducer from './installs'

const rootReducer = combineReducers({
  installs: installsReducer,
})

export default rootReducer
