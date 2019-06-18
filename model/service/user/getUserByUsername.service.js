var schema = require('../../schema');

/**
 * Find user by username
 * @param data
 * @param callback
 */
module.exports = (data, callback) => {
  schema.user.model.findOne({username: data.username}, callback);
};
