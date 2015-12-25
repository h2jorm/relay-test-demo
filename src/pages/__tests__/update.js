jest.dontMock('../update')
jest.dontMock('../../components/editor')

import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils'
const UpdateEditorPage = require('../update').default
import store from '../../store'

const article = {
  "data": {
    "article": {
      "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
      "title": "hello",
      "content": "world"
    }
  }
}

// const done = jest.genMockFn().Impl()

const myNetworkLayer = {
  sendMutation(mutationRequest) {
    // return mutationRequest.resolve({response: updateArticlePayload.data})
  },
  sendQueries(queryRequests) {
    return queryRequests.map(
      queryRequest => {
        return queryRequest.resolve({response: article.data})
      }
    )
  },
  supports() {
    return true
  }
}

Relay.injectNetworkLayer(myNetworkLayer)

describe('UpdateEditorPage', () => {

  it('should pass', () => {
    // const updateEditor = renderIntoDocument(
    //   <UpdateEditorPage routeParams={{id: 'QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE='}} />
    // )
    const updateEditor = ReactDOM.render(
      <UpdateEditorPage routeParams={{id: 'QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE='}} />,
      document.createElement('div')
    )
    console.log('store', store.getState())
    console.log(findRenderedDOMComponentWithTag(updateEditor, 'button'))
  })
})
