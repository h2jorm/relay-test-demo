const koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const articleSchema = require('./schema/index')

const PORT = 4000
const app = koa()

app.use(mount('/graphql', graphqlHTTP({
  schema: articleSchema,
  pretty: true,
  graphiql: true
})))

app.listen(PORT, () => console.log(`koa is listening on ${PORT}`))
