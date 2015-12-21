const {
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

const ArticleListType = new GraphQLObjectType({
  name: 'ArticleList',
  description: 'an array of articles',
  fields: () => ({
    articles: {type: new GraphQLList(ArticleType)}
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
  type: ArticleListType,
  resolve: root =>
    new Collection('articles').getAll().then(result => {
      return {
        articles: result
      }
    })
}

const add = {
  type: ArticleType,
  args: {
    article: {type: new GraphQLNonNull(ArticleInputType)}
  },
  resolve: (root, {article}) =>
    new Collection('articles').add(article)
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
  }
})

const update = {
  type: ArticleType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    article: {type: new GraphQLNonNull(ArticleInputType)}
  },
  resolve: (root, {id, article}) =>
    new Collection('articles').update({id}, article)
}

const remove = {
  type: ArticleType,
  args: {
    id: {type: GraphQLString}
  },
  resolve: (root, {id}) =>
    new Collection('articles').remove({id})
}

module.exports = {
  query: {
    query,
    queryAll
  },
  mutation: {
    addArticle: AddArticle,
    add,
    update,
    remove
  }
}
