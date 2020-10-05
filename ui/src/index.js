import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context'
import ReactGA from 'react-ga'
import { hotjar } from 'react-hotjar'
import App from './App'

console.log(window.location.hostname)
if (process.env.NODE_ENV !== 'development') {
  if (window.location.hostname === 'matcha') {
    ReactGA.initialize('UA-178733721-1')
    hotjar.initialize('2024584', '6')
  }
  if (window.location.hostname === 'matcha-recette') {
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
