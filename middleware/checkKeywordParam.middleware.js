const _ = require('lodash');

/**
 * Check Keyword is in request param
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.query) || _.isEmpty(req.query.keyword)) {
    return res.status(200).send({
      statusText: 'keyword is required'
    });
  }

  next();

};
