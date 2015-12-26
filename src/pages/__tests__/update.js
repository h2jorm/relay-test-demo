jest.dontMock('../update')
jest.dontMock('../../components/editor')

import React from 'react'
import ReactDOM from 'react-dom'
import {
  mockComponent,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils'
import Relay from 'react-relay'
import {
  renderContainerIntoDocument
} from 'relay-test-utils'
const {
  UpdateEditor,
  UpdateEditorContainer,
} = require('../update')

const article = {
  "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
  "title": "hello",
  "content": "world"
}

describe('UpdateEditorContainer', () => {
  it('should render UpdateEditor component correctly', () => {
    const {id, title, content} = article
    const container = renderContainerIntoDocument(
      <UpdateEditorContainer article={article} />
    )
    expect(findRenderedDOMComponentWithTag(container, 'input').value).toBe(title)
    expect(findRenderedDOMComponentWithTag(container, 'textarea').textContent).toBe(content)
  })
})

describe('UpdateEditor', () => {
  let updateEditor, updateEditorNode
  beforeEach(() => {
    updateEditor = renderIntoDocument(
      <UpdateEditor article={article} />
    )
    updateEditorNode = ReactDOM.findDOMNode(updateEditor)
  })
  it('should has a link to home page', () => {
    expect(updateEditorNode.querySelector('a').textContent).toBe('Back to index')
  })
  it('should launch a mutation request', () => {
    updateEditor = new UpdateEditor()
    updateEditor.updateArticle(article)
    expect(Relay.Store.update).toBeCalled()
  })
})
