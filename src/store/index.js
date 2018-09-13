import {createStore, combinedReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = x => x

export default preloaded => {
  return createStore(reducer, preloaded, composeWithDevTools())
}
