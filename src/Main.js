import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './screens/Loading'

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="*" component={Loading} />
        </Switch>
      </Router>
    )
  }
}
