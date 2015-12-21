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

class ArticleList extends React.Component {
  render() {
    return (
      <div className="page-list">
        <h1>Article List</h1>
        <ul>
          {this.props.articles.data.map(
            article => <Article article={article} key={article.id} />
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

ArticleList = Relay.createContainer(ArticleList, {
  fragments: {
    articles: () => Relay.QL`
      fragment on Articles {
        data {${Article.getFragment('article')}}
      }
    `
  }
})

class ArticleListRoute extends Relay.Route {
  static routeName = 'Home'
  static queries = {
    articles: Component => Relay.QL`
      query {
        queryAll {${Component.getFragment('articles')}}
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
