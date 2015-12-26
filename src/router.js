import React from 'react'
import {Router, Route, Link} from 'react-router'
import Home from './pages/home'
import {UpdateEditorPage} from './pages/update'
import history from './history'

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Home}></Route>
        <Route path="/article/update/:id" component={UpdateEditorPage}></Route>
      </Router>
    )
  }
}
