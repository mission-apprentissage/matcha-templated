import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context'
import { hotjar } from 'react-hotjar'
import TagManager from 'react-gtm-module'
import App from './App'

TagManager.initialize({ gtmId: 'GTM-WPC8P2B' })

if (process.env.NODE_ENV !== 'development') {
  if (window.location.hostname === 'matcha.apprentissage.beta.gouv.fr') {
    TagManager.initialize({ gtmId: 'GTM-WPC8P2B' })
  }
  if (window.location.hostname === 'matcha-recette.apprentissage.beta.gouv.fr') {
    hotjar.initialize('2024615', '6')
  }
}

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
