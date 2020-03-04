import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'

// Redux imports
import { Provider } from 'react-redux'
import store from './src/redux/store'

// Importar componente principal
import App from './src/components/App'

// Importar estilos
import './src/scss/app.scss'

const nodetoRender = document.querySelector('#app')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  nodetoRender
)
