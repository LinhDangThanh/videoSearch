const _ = require('lodash');

/**
 * Check radius is in request param
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.query) || _.isEmpty(req.query.radius)) {
    return res.send('radius is required');
  }

  next();

};
