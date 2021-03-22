import React from 'react'
import { Layout } from './components'
import { Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { FormulaireOPCO, NotFound } from './pages'
import theme from './theme'

import './App.css'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Switch>
          <Route exact path='/:_id' component={FormulaireOPCO} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ChakraProvider>
  )
}

export default App
