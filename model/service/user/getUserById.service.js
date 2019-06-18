const schema = require('../../schema');

/**
 * Find user by _id
 * @param data
 * @param callback
 */
module.exports = (data, callback) => {
  schema.user.model.findOne({_id: data.id}).lean().exec(callback);
};
