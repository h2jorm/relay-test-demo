import React from 'react'
import {Router, Route, Link} from 'react-router'
import List from './pages/list'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={List}></Route>
      </Router>
    )
  }
}
