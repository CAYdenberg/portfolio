import {Provider} from 'preact-redux'
import {h, render} from 'preact'

import createStore from '../store'
import Portfolio from '../components/Portfolio'

const store = createStore(window.__STATE__)

const App = () =>
  <Provider store={store}>
    <Portfolio />
  </Provider>

// render(<App />, document.getElementById('portfolio-entry'))

window.store = store

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  window.__REDUX_DEVTOOLS_EXTENSION__()
}
