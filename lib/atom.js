const {ObjectId} = require('mongodb')
const util = require('util')

module.exports = class Atom {
  toObjectId(id) {
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (e) {
      return Promise.reject('Invalid objectId')
    }
    return Promise.resolve(objectId);
  }
  sanitizeId(models) {
    return this._transformModels(models, '_id2id')
  }
  recoverId(models) {
    return this._transformModels(models, 'id2_id')
  }
  _transformModels(models, type) {
    if (util.isUndefined(models) || util.isNull(models)) return []
    if (!util.isArray(models))
      models = [models]
    switch (type) {
    case 'id2_id':
      models.map(model => {
        if (!model.id) return
        model._id = new ObjectId(model.id)
        model.id = undefined
      })
      break;
    case '_id2id':
      models.map(model => {
        if (!model._id) return
        model.id = model._id.toHexString()
        model._id = undefined
      })
      break
    }
    return models
  }
}
