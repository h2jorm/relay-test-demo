import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import Relay from 'react-relay'

const archive = {
  "data": {
    "archive": {
      "articles": {
        "edges": [
          {
            "node": {
              "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
              "title": "hello",
              "content": "world"
            }
          }
        ]
      }
    }
  }
}

const article = {
  "data": {
    "article": {
      "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
      "title": "hello",
      "content": "world"
    }
  }
}

const updateArticlePayload = {
  "data": {
    "updateArticle": {
      "clientMutationId": "0",
      "updatedArticle": {
        "id": "QXJ0aWNsZTo1NjdhNjBkMmI0YmUzNDFmNzVhY2ZiOTE=",
        "title": "hello",
        "content": "world2"
      }
    }
  }
}

const myNetworkLayer = {
  sendMutation(mutationRequest) {
    return mutationRequest.resolve({response: updateArticlePayload.data})
  },
  sendQueries(queryRequests) {
    return Promise.all(queryRequests.map(
      queryRequest => {
        return queryRequest.resolve({response: article.data})
      }
    ))
  },
  supports() {
    return true
  }
}
Relay.injectNetworkLayer(myNetworkLayer)
ReactDOM.render(<Router />, document.querySelector('#root'))
