const _ = require('lodash');

/**
 * Check username is in request body
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.username)) {
    return res.send('Username is required');
  }

  next();

};
