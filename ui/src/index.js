import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context'
import TagManager from 'react-gtm-module'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

TagManager.initialize({ gtmId: 'GTM-KL849C7' })

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
