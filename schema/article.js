const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  offsetToCursor,
  mutationWithClientMutationId
} = require('graphql-relay')
const Collection = require('../lib/collection')
const _ = require('lodash')

const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => {
    const {id, type} = fromGlobalId(globalId)
    if (type === 'Article')
      return new Collection('articles').get({id})
    else if (type === 'Archive')
      return new Collection('articles').getAll()
    else
      return null
  },
  obj => {
    return obj.articles ? ArchiveType : ArticleType
  }
)

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'article model',
  fields: () => ({
    id: globalIdField(),
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }),
  interfaces: [nodeInterface]
})

const {
  connectionType: articleConnection,
  edgeType: articleEdgeType
} = connectionDefinitions({nodeType: ArticleType})

const ArchiveType = new GraphQLObjectType({
  name: 'Archive',
  description: 'article collection',
  fields: () => ({
    id: globalIdField(),
    articles: {
      type: articleConnection,
      args: connectionArgs,
      resolve: (articles, args) => {
        return connectionFromArray(articles, args)
      }
    }
  }),
  interfaces: [nodeInterface]
})

const ArticleQuery = new GraphQLObjectType({
  name: 'ArticleQuery',
  fields: () => ({
    type: ArticleType,
    args: {
      id: new GraphQLNonNull(GraphQLID)
    },
    resolve: (root, {id}) => {
      return new Collection('articles').get({id: fromGlobalId(id).id})
    }
  })
})

const AddArticle = mutationWithClientMutationId({
  name: 'AddArticle',
  inputFields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  },
  outputFields: {
    newArticle: {
      type: articleEdgeType,
      resolve: ({newArticle, cursor}) => {
        return {
          cursor,
          node: newArticle
        }
      }
    },
    archive: {
      type: ArchiveType,
      resolve: ({articles}) => articles
    }
  },
  mutateAndGetPayload: ({title, content}) => {
    return new Collection('articles').add({title, content})
    .then(newArticle => {
      return new Collection('articles').getAll().then(articles => {
        return {
          newArticle,
          articles,
          cursor: offsetToCursor(
            _.findIndex(articles, article => article.id === newArticle.id)
          )
        }
      })
    })
  }
})

const UpdateArticle = mutationWithClientMutationId({
  name: 'UpdateArticle',
  inputFields: {
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  },
  outputFields: {
    updatedArticle: {
      type: ArticleType,
      resolve: payload => payload.updatedArticle
    },
    archive: {
      type: ArchiveType,
      resolve: () => new Collection('articles').getAll()
    }
  },
  mutateAndGetPayload: ({id, title, content}) => {
    return new Collection('articles').update({id: fromGlobalId(id).id}, {title, content})
    .then(updatedArticle => ({updatedArticle}))
  }
})

const RemoveArticle = mutationWithClientMutationId({
  name: 'RemoveArticle',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  outputFields: {
    removedArticleId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: payload => payload.removedArticleId
    },
    archive: {
      type: ArchiveType,
      resolve: () => new Collection('articles').getAll()
    }
  },
  mutateAndGetPayload: ({id}) => {
    return new Collection('articles').remove({id: fromGlobalId(id).id})
    .then(removedArticle => ({removedArticleId: id}))
  }
})

module.exports = {
  query: {
    archive: {
      type: ArchiveType,
      resolve: () => {
        return new Collection('articles').getAll()
      }
    },
    article: {
      type: ArticleType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: (root, {id}) => {
        return new Collection('articles').get({id: fromGlobalId(id).id})
      }
    },
    node: nodeField
  },
  mutation: {
    addArticle: AddArticle,
    updateArticle: UpdateArticle,
    removeArticle: RemoveArticle
  }
}
