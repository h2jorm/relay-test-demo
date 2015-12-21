import React from 'react'
import Relay from 'react-relay'
import {Link} from 'react-router'

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

class ArticleList extends React.Component {
  render() {
    return (
      <div>
        <h1>List page</h1>
        <Link to="/editor">Editor page</Link>
        <ul>
          {this.props.articleList.articles.map(
            article => <Article article={article} key={article.id} />
          )}
        </ul>
      </div>
    )
  }
}

ArticleList = Relay.createContainer(ArticleList, {
  fragments: {
    articleList: () => Relay.QL`
      fragment on ArticleList {
        articles {${Article.getFragment('article')}}
      }
    `
  }
})

class ArticleListRoute extends Relay.Route {
  static routeName = 'Home'
  static queries = {
    articleList: Component => Relay.QL`
      query {
        queryAll {${Component.getFragment('articleList')}}
      }
    `
  }
}

export default class Page extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={ArticleList}
        route={new ArticleListRoute()}
      />
    )
  }
}
