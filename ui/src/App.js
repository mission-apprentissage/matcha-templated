import React from 'react'
import { Layout } from './components'
import { Switch, Route } from 'react-router-dom'
import { Context } from './context'
import { NotFound } from './pages'
import routes from './routes'

import './App.css'

const App = () => {
  const { profile } = React.useContext(Context)
  console.log('context', profile)
  return (
    <Layout>
      <Switch>
        {routes.map(({ path, component }, key) => (
          <Route exact path={path} key={key} component={component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default App
