/**
 * Check token in header and also attach user in header
 */
const _ = require('lodash');

const utility = require('../utility')
  , service = require('../model/service');

module.exports = (req, res, next) => {
  const token = req.get('token');

  utility.jwt.verifyAsync(token, function(error, data) {
    if(error || _.isEmpty(data)) {
      return res.status(200).send({
        statusText: 'Authorization is required'
      });
    }

    service.user.getUserById({id: data._id}, function(error, result) {
      if(error || _.isEmpty(result)) {
        return res.status(200).send({
          statusText: 'Authorization is required'
        });
      }

      _.unset(result, 'password');
      req.headers.user = result;

      next();

    });
  });
};
