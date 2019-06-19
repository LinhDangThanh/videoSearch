const _ = require('lodash');

const utility = require('../../utility')
  , service = require('../../model/service');
/**
 * Handle login request
 * @param req
 * @param res
 * return token, user data
 */
module.exports = (req, res) => {
  const data = {
    username: req.body.username
  };

  service.user.getUserByUsername(data, (error, result) => {
    if (error) {
      return res.status(200).send({
        statusText: 'Internal error'
      });
    }

    if (_.isEmpty(result)) {
      return res.status(200).send({
        statusText: 'Wrong Username/password'
      });
    }

    // compare password and stored hash-password
    utility.bcrypt.compareHashAsync(req.body.password, result.password, (error, compared) => {
      if (error) {
        return res.status(200).send({
          statusText: 'Internal error'
        });
      }

      if (compared === false) {
        return res.status(200).send({
          statusText: 'Wrong Username/password'
        });
      }

      // create token
      utility.jwt.signAsync({_id: result._id}, (error, token) => {
        if (error || _.isEmpty(token)) {
          return res.status(200).send({
            statusText: 'Internal error'
          });
        }

        delete result.password;
        res.send({
          statusText: '',
          token: token,
          user: result,
        });

      });
    });
  });
};
