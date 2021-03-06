const _ = require('lodash');

/**
 * Check fullname is in request body
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.fullname)) {
    return res.status(200).send({
      statusText: 'Fullname is required'
    });
  }

  next();

};
