import React from 'react'
import { render } from 'react-dom'
import { ToastContainer } from 'react-toastify'
import 'babel-polyfill'

// Css global styles - Styled Components

import GlobalStyle from './src/styles/global'
import 'react-toastify/dist/ReactToastify.css'

// Redux imports
import { Provider } from 'react-redux'
import store from './src/redux/store'

// Importar componente principal
import App from './src/components/App'

// Importar estilos
// import './src/scss/app.scss'

const nodetoRender = document.querySelector('#app')

render(
  <Provider store={store}>
    <ToastContainer autoClose={5000} />
    <GlobalStyle />
    <App />
  </Provider>,
  nodetoRender
)
