import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context'
import ReactGA from 'react-ga'
import App from './App'

if (process.env.NODE_ENV !== 'development') ReactGA.initialize('UA-178733721-1')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
