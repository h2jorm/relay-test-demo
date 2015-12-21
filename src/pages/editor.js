import React from 'react'
import Relay from 'react-relay'
import style from './editor.less'

export default class Editor extends React.Component {
  render() {
    return (
      <div className="page-editor">
        <h1>This is Editor page</h1>
        <form onSubmit={::this.addArticle}>
          <div>
            <input type="text" placeholder="title"/>
          </div>
          <div>
            <textarea placeholder="content"></textarea>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }
  addArticle() {
    event.preventDefault()
    console.log('hello world')
  }
}
