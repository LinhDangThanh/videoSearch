const jsonwebtoken = require('jsonwebtoken')
  , config = require('../config');

/**
 * JWT token utility
 * @type {{}}
 */
const internal = {};

internal.signAsync = function (data, callback) {
  jsonwebtoken.sign(data, config.app.secret, callback);
};

internal.verifyAsync = function (token, callback) {
  jsonwebtoken.verify(token, config.app.secret, callback);
};

module.exports = internal;

