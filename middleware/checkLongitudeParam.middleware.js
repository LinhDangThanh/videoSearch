const _ = require('lodash');

/**
 * Check longitude is in request param
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.query) || _.isEmpty(req.query.longitude)) {
    return res.send('longitude is required');
  }

  next();

};
