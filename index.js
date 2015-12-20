const express = require('express')
const graphqlHTTP = require('express-graphql')
const articleSchema = require('./schema/article')

const PORT = 4000
const app = express()

app.use('/graphql', graphqlHTTP({
  schema: articleSchema,
  pretty: true,
  graphiql: true
}))

app.listen(PORT, () => console.log(`express is listening on ${PORT}`))
