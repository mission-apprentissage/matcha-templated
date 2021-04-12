import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Formulaire, NotFound, Remerciement } from './pages'
import { Login, UserList } from './pages/admin-dashboard'
import useAuth from './common/hooks/useAuth'
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
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path='/admin'>
            <UserList />
          </PrivateRoute>
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
