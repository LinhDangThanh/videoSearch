const _ = require('lodash');

/**
 * Check password is in request body
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.password)) {
    return res.status(200).send({
      statusText: 'Password is required'
    });
  }

  next();

};
