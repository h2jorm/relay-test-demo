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
        archive {
          articles
        },
        newArticle {
          id, content, title
        }
      }
    `
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'archive',
      parentID: this.props.archive.id,
      connectionName: 'articles',
      edgeName: 'newArticle',
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }
}
