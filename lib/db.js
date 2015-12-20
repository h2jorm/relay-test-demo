const {Db, Server} = require('mongodb')

const dbPort = 27017
const dbHost = 'localhost'
const dbName = 'graphql-demo'

let db = new Db(dbName, new Server(dbHost, dbPort))

db.open((err, db) => {
  if (err)
    throw new Error(err)
  console.log(`Mongodb connected: ${dbName}`)
})

module.exports = db
