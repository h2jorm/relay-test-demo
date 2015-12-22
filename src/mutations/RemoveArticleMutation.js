import Relay from 'react-relay'

export default class RemoveArticleMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {removeArticle}
    `
  }
  getVariables() {
    return {id: this.props.id}
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveArticlePayload {
        removedArticleId
        archive {id}
      }
    `
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'archive',
      parentID: this.props.archive.id,
      // connectionName: 'articles',
      deletedIDFieldName: 'removedArticleId'
    }]
  }
}
