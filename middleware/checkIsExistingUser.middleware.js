const _ = require('lodash');

const service = require('../model/service');

/**
 * Check user is existing. Find user in db by username
 * @param req
 * @param res
 * @param next
 * @returns {*|void}
 */
module.exports = (req, res, next) => {
  const data = {
    username: req.body.username
  };

  service.user.getUserByUsername(data, (error, result) => {
    if (error) {
      return res.status(200).send({
        statusText: 'Internal error'
      });
    }

    if (_.isEmpty(result) === false) {
      return res.status(200).send({
        statusText: 'User is existing'
      });
    }

    next();
  });
};
