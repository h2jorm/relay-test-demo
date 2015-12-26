jest.dontMock('../home')

import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils'
import {
  renderContainerIntoDocument
} from 'relay-test-utils'
const {
  Article,
  ArticleList,
  Home,
  HomeContainer,
} = require('../home')
import RemoveArticleMutation from '../../mutations/RemoveArticleMutation'

const archive = {
  "id": "QXJjaGl2ZTo=",
  "articles": {
    "edges": [
      {
        "node": {
          "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
          "title": "hello",
          "content": "world"
        },
        "cursor": "YXJyYXljb25uZWN0aW9uOjA="
      },
      {
        "node": {
          "id": "QXJ0aWNsZTo1NjdkM2NmMTEyYWJhNmE2NmU3YzE0OTc=",
          "title": "good",
          "content": "day"
        },
        "cursor": "YXJyYXljb25uZWN0aW9uOjE="
      }
    ],
    "pageInfo": {
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}

const ARTICLE_NUMBER = archive.articles.edges.length

const emptyArchive = {
  "id": "QXJjaGl2ZTo=",
  "articles": {
    "edges": []
  }
}

describe('HomeContainer', () => {
  it('should render Home component correctly', () => {
    const container = renderContainerIntoDocument(
      <HomeContainer archive={archive} />
    )
  })
})

describe('Article', () => {
  const ARTICLE = archive.articles.edges[0].node
  const {id, title, content} = ARTICLE
  const href = `/article/update/${id}`
  let article, articleNode
  beforeEach(() => {
    article = renderIntoDocument(
      <Article article={ARTICLE} archive={archive} />
    )
    articleNode = ReactDOM.findDOMNode(article)
  })
  it('should render a link', () => {
    const link = articleNode.querySelector('a').textContent
    expect(link).toBe(`${title}-${content}`)
  })
  it('should have a button named remove', () => {
    expect(articleNode.querySelector('button').textContent).toBe('remove')
  })
  it('should execute Relay.Store.update when clicked the button', () => {
    Simulate.click(findRenderedDOMComponentWithTag(article, 'button'))
    expect(Relay.Store.update).toBeCalled()
  })
})

describe('ArticleList', () => {
  let articleList, articleListNode
  it(`should render a list with ${ARTICLE_NUMBER} articles`, () => {
    articleList = renderIntoDocument(
      <ArticleList archive={archive} />
    )
    articleListNode = ReactDOM.findDOMNode(articleList)
    expect(articleListNode.querySelectorAll('li').length).toBe(ARTICLE_NUMBER)
  })
  it('should give an message when rendering an empty list', () => {
    articleList = renderIntoDocument(
      <ArticleList archive={emptyArchive} />
    )
    articleListNode = ReactDOM.findDOMNode(articleList)
    expect(articleListNode.querySelector('em').textContent).toBe('No articles')
  })
})

describe('Home', () => {
  let home
  beforeEach(() => {
    home = renderIntoDocument(
      <Home archive={archive} />
    )
  })
  // it('should have correct list item number', () => {
  //   const homeNode = ReactDOM.findDOMNode(home)
  //   expect(homeNode.querySelectorAll('li').length).toBe(2)
  // })
})
