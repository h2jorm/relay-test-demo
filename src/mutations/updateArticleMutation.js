import Relay from 'react-relay'

module.exports = class UpdateArticleMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {updateArticle}
    `
  }
  getVariables() {
    const {id, title, content} = this.props
    return {id, title, content}
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateArticlePayload {
        updatedArticle {id,title,content}
      }
    `
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {updatedArticle: this.props.id}
    }]
  }
}
