const bcrypt = require('bcryptjs');

/**
 * Bcrypt utility
 */
const internal = {};

internal.genHashAsync = function (length, data, callback) {
  bcrypt.genSalt(length, function (err, salt) {
    bcrypt.hash(data, salt, callback);
  });
};

internal.compareHashAsync = function (hash1, hash2, callback) {
  bcrypt.compare(hash1, hash2, callback);
};

module.exports = internal;
