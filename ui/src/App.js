import React from 'react'
import { Layout } from './components'
import { Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { FormulaireOPCO, NotFound, Remerciement } from './pages'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from './theme'

import './App.css'

const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Switch>
            <Route exact path='/merci' component={Remerciement} />
            <Route exact path='/:id' component={FormulaireOPCO} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
