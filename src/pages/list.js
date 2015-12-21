import React from 'react'
import {Link} from 'react-router'

export default class List extends React.Component {
  render() {
    return (
      <div>
        <h1>List page</h1>
        <Link to="/editor">Editor page</Link>
      </div>
    )
  }
}
