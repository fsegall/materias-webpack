// Criar a store para gerenciar o state
import { createStore, applyMiddleware, compose } from 'redux'
// Usa o thunk para fazer ações assíncronas do redux
import thunk from 'redux-thunk'

import rootReducer from '../reducers/'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

export default store
