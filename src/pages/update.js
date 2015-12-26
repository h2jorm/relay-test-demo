import React from 'react'
import Relay from 'react-relay'
import {Link} from 'react-router'
import Editor from '../components/editor'
import UpdateArticleMutation from '../mutations/UpdateArticleMutation'
import history from '../history'
import {setArticleToUpdate} from '../store/actions'
import store from '../store'

export class UpdateEditor extends React.Component {
  updateArticle({id, title, content}) {
    const onSuccess = function () {
      history.replaceState(null, '/')
    }
    const onFail = function () {
      window.alert('update failed')
    }
    Relay.Store.update(new UpdateArticleMutation({
      id, title, content
    }), {onSuccess, onFail})
  }
  render() {
    const {id, title, content} = this.props.article
    return (
      <div>
        <Link to="/">Back to index</Link>
        <Editor
          id={id}
          title={title}
          content={content}
          submit={::this.updateArticle}
        />
      </div>
    )
  }
}

export let UpdateEditorContainer = Relay.createContainer(UpdateEditor, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {
        id, title, content
      }
    `
  }
})

export class UpdateEditorRoute extends Relay.Route {
  static routeName = 'UpdateArticle'
  static paramDefinition = {
    articleId: {require: true}
  }
  static queries = {
    article: Component => Relay.QL`
      query {
        article(id: $articleId) {
          ${UpdateEditorContainer.getFragment('article')}
        }
      }
    `
  }
}

export class UpdateEditorPage extends React.Component {
  render() {
    const route = new UpdateEditorRoute({articleId: this.props.routeParams.id})
     return (
      <Relay.RootContainer
        Component={UpdateEditorContainer}
        route={route}
      />
    )
  }
}
