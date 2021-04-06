import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Formulaire, NotFound, Remerciement } from './pages'
import { Login } from './pages/admin-dashboard'
// import Dashboard from './pages/formulaire-entreprise/dashboard/Dashboard'
import useAuth from './common/hooks/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from './theme'

import './App.css'

const client = new QueryClient()

function PrivateRoute({ children, ...rest }) {
  let [auth] = useAuth()

  return (
    <Route
      {...rest}
      render={() => {
        return auth.sub !== 'anonymous' ? children : <Redirect to='/login' />
      }}
    />
  )
}

const App = () => {
  let [auth] = useAuth()
  console.log({ auth })
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Switch>
          {/* {auth && auth.permissions.isAdmin && <PrivateRoute exact path='/admin' component={Dashboard} />} */}
          <Route exact path='/merci' component={Remerciement} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/:id' component={Formulaire} />
          <Route component={NotFound} />
        </Switch>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
