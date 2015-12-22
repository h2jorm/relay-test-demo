import React from 'react'
import Relay from 'react-relay'
import {Link} from 'react-router'
import AddArticleMutation from '../mutations/AddArticleMutation'
import RemoveArticleMutation from '../mutations/RemoveArticleMutation'
import style from './list.less'

class Article extends React.Component {
  remove(event) {
    event.preventDefault()
    const {id} = this.props.article
    this.props.remove(id)
  }
  render() {
    const {id, title, content} = this.props.article
    const link = `/article/${id}`
    return (
      <li>
        <Link to={link}>{title}-{content}</Link>
        <button onClick={::this.remove}>remove</button>
      </li>
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
  handleSubmit(event) {
    event.preventDefault()
    const {title, content} = this.refs
    Relay.Store.update(
      new AddArticleMutation({
        title: title.value,
        content: content.value,
        archive: this.props.archive
      })
    )
    title.value = content.value = ''
  }
  removeArticle(id) {
    Relay.Store.update(
      new RemoveArticleMutation({
        id,
        archive: this.props.archive
      })
    )
  }
  render() {
    return (
      <div className="page-list">
        <h1>Article List</h1>
        <ul>
          {this.props.archive.articles.edges.map(edge =>
            <Article
              article={edge.node}
              key={edge.node.id}
              remove={::this.removeArticle}
            />
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
}

Archive = Relay.createContainer(Archive, {
  fragments: {
    archive: () => Relay.QL`
      fragment on Archive {
        id
        articles(first: 10) {
          edges {
            node {
              id
              ${Article.getFragment('article')}
            }
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
