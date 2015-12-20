const {ObjectId} = require('mongodb')
const util = require('util')

module.exports = class Atom {
  sanitize(models) {
    let isArray = util.isArray(models);
    if (util.isUndefined(models) || util.isNull(models)) return []
    if (!isArray)
      models = [models]
    models.map(model => {
      if (model.hasOwnProperty('id')) {
        model._id = new ObjectId(model.id)
        model.id = undefined
        return
      }
      if (model.hasOwnProperty('_id')) {
        model.id = model._id.toHexString()
        model._id = undefined
      }
    })
    return isArray ? models : models[0]
  }
}
