import Relay from 'react-relay'

export class AddArticleMutation extends Relay.Mutation {
  // static fragments = {
  //   articles: () => Relay.QL`
  //     fragment on Article {
  //       data {id, title, content}
  //     }
  //   `
  // }
  getMutation() {
    return Relay.QL`
      mutation {addArticle}
    `
  }
  getVariables() {
    const {title, content} = this.props
    return {title, content}
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddArticlePayload {
        article {
          id, title, content
        }
      }
    `
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {article: '123456789'}
    }]
  }
}
