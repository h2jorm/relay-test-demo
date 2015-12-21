import React from 'react'
import Relay from 'react-relay'
import {AddArticleMutation} from '../mutations/article'
import style from './list.less'

class Article extends React.Component {
  render() {
    const {id, title, content} = this.props.article
    return (
      <li>{title}-{content}</li>
    )
  }
}

Article = Relay.createContainer(Article, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {id, title, content}
    `
  }
})

class Archive extends React.Component {
  render() {
    return (
      <div className="page-list">
        <h1>Article List</h1>
        <ul>
          {this.props.archive.articles.edges.map(
            edge => <Article article={edge.node} key={edge.cursor} />
          )}
        </ul>
        <hr />
        <div>
          <h2>Editor</h2>
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
            <button type="submit">create</button>
          </form>
        </div>
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
      })
    )
    title.value = content.value = ''
  }
}

Archive = Relay.createContainer(Archive, {
  fragments: {
    archive: () => Relay.QL`
      fragment on Archive {
        articles(first: 10) {
          edges {
            node {${Article.getFragment('article')}}
          }
        }
      }
    `
  }
})

class ArchiveRoute extends Relay.Route {
  static routeName = 'Home'
  static queries = {
    archive: Component => Relay.QL`
      query {
        archive {${Archive.getFragment('archive')}}
      }
    `
  }
}

export default class Page extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={Archive}
        route={new ArchiveRoute()}
      />
    )
  }
}
