import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context'
import TagManager from 'react-gtm-module'
import App from './App'

TagManager.initialize({ gtmId: 'GTM-KL849C7' })

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
