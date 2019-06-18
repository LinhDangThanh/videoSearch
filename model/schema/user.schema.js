/**
 * User schema
 * Define user schema
 */
const mongoose = require('mongoose');

const config = require('../../config');

const docs = {
  username: {type: String, required: true},
  password: {type: String, required: true},
  fullname: {type: String, required: true},
  __v: {type: Number, select: false}
};

const schema = new mongoose.Schema(docs,
  {collection: config.db.user.collection, strict: true});

const model = mongoose.model(config.db.user.model, schema);

module.exports = {
  model: model,
  schema: schema
};
