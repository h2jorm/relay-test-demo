import Relay from 'react-relay'

export default class UpdateArticleMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {updateArticle}
    `
  }
  getVariables() {
    const {id, title, content} = this.props
    return {id, title, content}
  }
  getConfigs() {
    return []
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateArticlePayload {
        updatedArticle {id,title,content}
      }
    `
  }
}
