const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const {query, mutation} = require('./article')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => query
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => mutation
  })
})
