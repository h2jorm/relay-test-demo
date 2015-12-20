const db = require('../lib/db')
const Atom = require('./atom')

module.exports = class Collection extends Atom {
  constructor(name) {
    super()
    if (!name)
      throw new Error('new Collection should has a name argument')
    this.collection = db.collection(name)
  }
  add(model) {
    return this.collection.insertOne(model).then(result => {
      return this.sanitize(result.ops[0])
    })
  }
  getAll() {
    return this.collection.find().toArray().then(result =>
      this.sanitize(result)
    )
  }
  get(query) {
    query = this.sanitize(query)
    return this.collection.findOne(query).then(result => {
      return this.sanitize(result)
    })
  }
  update(query, newModel) {
    query = this.sanitize(query)
    return this.collection.findOneAndUpdate(newModel).then(result => this.sanitize(result))
  }
  remove(query) {
    return this.collection.findOneAndDelete(query).then(result => this.sanitizedId(result))
  }
}
