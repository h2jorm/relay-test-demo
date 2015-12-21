const {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const {mutationWithClientMutationId} = require('graphql-relay')
const Collection = require('../lib/collection')

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'article model',
  fields: {
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }
})

const ArticlesType = new GraphQLObjectType({
  name: 'Articles',
  description: 'an array of articles',
  fields: () => ({
    data: {type: new GraphQLList(ArticleType)}
  })
})

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  description: 'a new article or a edited article',
  fields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }
})

const query = {
  type: ArticleType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (root, {id}) =>
    new Collection('articles').get({id})
}

const queryAll = {
  type: ArticlesType,
  args: {
    page: {type: GraphQLInt},
    per: {type: GraphQLInt},
  },
  resolve: (root, {page, per}) =>
    new Collection('articles').getAll({page, per}).then(result => ({data: result}))
}

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
    query,
    queryAll
  },
  mutation: {
    addArticle: AddArticle,
    updateArticle: UpdateArticle,
    removeArticle: RemoveArticle
  }
}
