import Relay from 'react-relay'

module.exports = class RemoveArticleMutation extends Relay.Mutation {
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
      // parentID: this.props.archiveId,
      // connectionName: 'articles',
      deletedIDFieldName: 'removedArticleId'
    }]
  }
}
