import React from 'react'
import Relay from 'react-relay'
import {Link} from 'react-router'
import AddArticleMutation from '../mutations/AddArticleMutation'
import RemoveArticleMutation from '../mutations/RemoveArticleMutation'
import Editor from '../components/editor'

class Article extends React.Component {
  remove(event) {
    event.preventDefault()
    const {id, archiveId} = this.props.article
    Relay.Store.update(
      new RemoveArticleMutation({id, archiveId})
    )
  }
  render() {
    const {id, title, content} = this.props.article
    const link = `/article/update/${id}`
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

class Home extends React.Component {
  handleSubmit({title, content}) {
    Relay.Store.update(
      new AddArticleMutation({
        title, content,
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
              archiveId={this.props.archive.id}
            />
          )}
        </ul>
        <hr />
        <Editor submit={::this.handleSubmit} />
      </div>
    )
  }
}

Home = Relay.createContainer(Home, {
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
        archive {${Component.getFragment('archive')}}
      }
    `
  }
}

export default class HomePage extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={Home}
        route={new ArchiveRoute()}
      />
    )
  }
}
