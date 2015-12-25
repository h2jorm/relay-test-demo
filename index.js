const path = require('path')
const koa = require('koa')
const mount = require('koa-mount')
const send = require('koa-send')
const staticDir = require('koa-static')
const route = require('koa-route')
const graphqlHTTP = require('koa-graphql')
const articleSchema = require('./schema/index')

const PORT = 4000
const app = koa()

if (process.env.NODE_ENV === 'development') {
  const logger = require('koa-logger')
  app.use(logger())
}
app.use(mount('/assets', staticDir(path.join(__dirname, 'build'))))
app.use(mount('/graphql', graphqlHTTP({
  schema: articleSchema,
  pretty: true,
  graphiql: true
})))
app.use(route.get('/', function *() {
  yield send(this, 'public/index.html')
}))
app.use(route.get('/hello', function *() {
  yield send(this, 'public/index.html')
}))
app.use(route.get('/article/update/:id', function *() {
  yield send(this, 'public/index.html')
}))

app.listen(PORT, () => console.log(`koa is listening on ${PORT}`))
