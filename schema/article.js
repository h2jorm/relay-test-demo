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
    const {id} = fromGlobalId(globalId)
    return new Collection('article').get({id})
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
  fields: {
    articles: {
      type: articleConnection,
      args: connectionArgs,
      resolve: (articles, args) => {
        return connectionFromArray(articles, args)
      }
    }
  }
})

const AddArticle = mutationWithClientMutationId({
  name: 'AddArticle',
  inputFields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  },
  outputFields: {
    article: {type: ArticleType}
  },
  mutateAndGetPayload: ({title, content}) => {
    return new Collection('articles').add({title, content})
    .then(result => {
      return {article: result}
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
    article: {type: ArticleType}
  },
  mutationWithClientMutationId: ({id, title, content}) => {
    return new Collection('articles').update({id}, {title, content})
  }
})

const RemoveArticle = mutationWithClientMutationId({
  name: 'RemoveArticle',
  inputFields: {
    id: {type: GraphQLString}
  },
  outputFields: {
    article: {type: ArticleType}
  },
  mutateAndGetPayload: ({id}) => {
    return new Collection('articles').remove({id})
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
