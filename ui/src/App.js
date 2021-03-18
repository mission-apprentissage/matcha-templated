import React from 'react'
import { Layout } from './components'
import { Switch, Route } from 'react-router-dom'
import { FormulaireOPCO, NotFound } from './pages'

import './App.css'

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/:_id' component={FormulaireOPCO} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default App
