import React from 'react'
import {Router, Route, Link} from 'react-router'
import Editor from './pages/Editor'
import List from './pages/list'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={List}></Route>
        <Route path="/editor" component={Editor}></Route>
      </Router>
    )
  }
}
