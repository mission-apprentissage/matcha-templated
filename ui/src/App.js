import { Switch, Route, Redirect } from 'react-router-dom'

import { Formulaire, NotFound, Remerciement, Login, List, HomePage, Offre } from './pages'
import useAuth from './common/hooks/useAuth'

function PrivateRoute({ children, ...rest }) {
  let [auth] = useAuth()

  return (
    <Route
      {...rest}
      render={() => {
        return auth.sub !== 'anonymous' ? children : <Redirect to='/' />
      }}
    />
  )
}

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/admin'>
        <List />
      </PrivateRoute>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/merci' component={Remerciement} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/formulaire/:id' render={(props) => <Formulaire {...props} byId={true} />} />
      <Route exact strict path='/offre/:id/:status' component={Offre} />
      <Route strict path='/:origine/' component={Formulaire} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
