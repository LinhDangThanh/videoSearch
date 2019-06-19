const _ = require('lodash');

/**
 * Check latitude is in request param
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.query) || _.isEmpty(req.query.latitude)) {
    return res.status(200).send({
      statusText: 'latitude is required'
    });
  }

  next();

};
