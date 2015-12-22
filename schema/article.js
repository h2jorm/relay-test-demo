const {
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
  mutationWithClientMutationId
} = require('graphql-relay')
const Collection = require('../lib/collection')

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
  connectionType: articleConnection
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

const AddArticle = mutationWithClientMutationId({
  name: 'AddArticle',
  inputFields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  },
  outputFields: {
    newArticle: {
      type: ArticleType,
      resolve: payload => payload.newArticle
    },
    archive: {
      type: ArchiveType,
      resolve: () => {
        return new Collection('articles').getAll()
      }
    }
  },
  mutateAndGetPayload: ({title, content}) => {
    return new Collection('articles').add({title, content})
    .then(newArticle => ({newArticle}))
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
    id: {type: GraphQLString}
  },
  outputFields: {
    removedArticle: {
      type: ArticleType,
      resolve: payload => payload.removedArticle
    },
    archive: {
      type: ArchiveType,
      resolve: () => new Collection('articles').getAll()
    }
  },
  mutateAndGetPayload: ({id}) => {
    return new Collection('articles').remove({id: fromGlobalId(id).id})
    .then(removedArticle => ({removedArticle}))
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
    node: nodeField
  },
  mutation: {
    addArticle: AddArticle,
    updateArticle: UpdateArticle,
    removeArticle: RemoveArticle
  }
}
