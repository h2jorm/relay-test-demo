import React from 'react'
import Relay from 'react-relay'
import style from './editor.less'

class AddArticleMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {addArticle}
    `
  }
  getVariables() {
    const {title, content} = this.props
    return {title, content}
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddArticlePayload {
        article {
          id, title, content
        }
      }
    `
  }
  getConfigs() {
    return []
  }
}

export default class Editor extends React.Component {
  render() {
    return (
      <div className="page-editor">
        <h1>This is Editor page</h1>
        <form onSubmit={::this.handleSubmit}>
          <div>
            <input type="text"
              placeholder="title"
              ref="title"
            />
          </div>
          <div>
            <textarea placeholder="content"
              ref="content">
            </textarea>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    const {title, content} = this.refs
    Relay.Store.update(
      new AddArticleMutation({
        title: title.value,
        content: content.value
      }),
      {
        onSuccess: () => {
          this.props.history.replaceState(null, '/')
        }
      }
    )
    title.value = content.value = ''
  }
}
