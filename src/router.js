import React from 'react'
import {Router, Route, Link} from 'react-router'
import List from './pages/list'
import Editor from './pages/editor'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={List}></Route>
        <Route path="/article/:id" component={Editor}></Route>
      </Router>
    )
  }
}
