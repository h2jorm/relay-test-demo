import React from 'react'
import {Router, Route, Link} from 'react-router'
import Home from './pages/home'
import UpdateEditorPage from './pages/update'
import {Hello} from './pages/hello'
import history from './history'

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Home}></Route>
        <Route path="/article/update/:id" component={UpdateEditorPage}></Route>
        <Route path="/hello" component={Hello}></Route>
      </Router>
    )
  }
}
