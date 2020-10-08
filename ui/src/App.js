import React from 'react'
import { Layout } from './components'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from './pages'
import routes from './routes'

import './App.css'

const App = () => {
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
