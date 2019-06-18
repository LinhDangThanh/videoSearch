const schema = require('../../schema');

/**
 * create user
 * @param data
 * @param callback
 */
module.exports = (data, callback) => {
  schema.user.model.create(data, callback);
};
