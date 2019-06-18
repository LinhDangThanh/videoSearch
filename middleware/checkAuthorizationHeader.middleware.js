/**
 * check authorization header
 */

const _ = require('lodash');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');

  if(_.isEmpty(authorization)) {
    return res.send('Authorization is required');
  }

  const arr = _.split(authorization, 'Bearer ');

  if(_.isEmpty(arr)) {
    return res.send('Authorization is required');
  }

  req.headers.token = arr[1];
  next();

};
