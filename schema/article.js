const {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
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

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ArticleQueryType',
    fields: {
      article: {
        type: ArticleType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, {id}) =>
          new Collection('articles').get({id})
      },
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: root =>
          new Collection('articles').getAll()
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'ArticleMutationType',
    fields: {
      add: {
        type: ArticleType,
        args: {
          title: {type: GraphQLString},
          content: {type: GraphQLString}
        },
        resolve: (root, {title, content}) =>
          new Collection('articles').add({title, content})
      }
    }
  })
})
