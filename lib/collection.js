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
      console.log(this.sanitizeId(result.ops))
      return this.sanitizeId(result.ops)[0]
    })
  }
  getAll() {
    return this.collection.find().toArray().then(result =>
      this.sanitizeId(result)
    )
  }
  get(query) {
    query = this.recoverId(query)[0]
    return this.collection.findOne(query).then(result => {
      console.log(this.sanitizeId(result))
      return this.sanitizeId(result)[0]
    })
  }
  update(query, newModel) {
    query = this.recoverId(query)[0]
    return this.collection.findOneAndUpdate(newModel).then(result => this.sanitizeId(result))
  }
  remove(query) {
    return this.collection.findOneAndDelete(query).then(result => this.sanitizedId(result))
  }
}
