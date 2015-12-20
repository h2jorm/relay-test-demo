const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
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
  type: new GraphQLList(ArticleType),
  resolve: root =>
    new Collection('articles').getAll()
}

const add = {
  type: ArticleType,
  args: {
    article: {type: new GraphQLNonNull(ArticleInputType)}
  },
  resolve: (root, {article}) =>
    new Collection('articles').add(article)
}

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
    add,
    update,
    remove
  }
}
