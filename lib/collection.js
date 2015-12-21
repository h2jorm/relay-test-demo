const db = require('../lib/db')
const Base = require('./base')

module.exports = class Collection extends Base {
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
  getAll(options = {}) {
    const {page = 1, per = 10} = options
    return this.collection.find()
    .skip((page - 1) * per).limit(per)
    .toArray().then(result => {
      return this.sanitize(result)
    })
  }
  get(query) {
    query = this.sanitize(query)
    return this.collection.findOne(query).then(result => {
      return this.sanitize(result)
    })
  }
  update(query, newModel) {
    query = this.sanitize(query)
    return this.collection.findOneAndReplace(query, newModel).then(result => {
      return Object.assign(this.sanitize(result.value), newModel)
    })
  }
  remove(query) {
    query = this.sanitize(query)
    return this.collection.findOneAndDelete(query).then(result => {
      return this.sanitize(result.value)
    })
  }
}
