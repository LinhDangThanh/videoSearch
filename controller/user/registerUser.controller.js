const utility = require('../../utility')
  , service = require('../../model/service');
/**
 * Handle register request. Hash password before saving data
 * @param req
 * @param res
 */
module.exports = (req, res) => {
  const data = {
    username: req.body.username,
    fullname: req.body.fullname
  };

  utility.bcrypt.genHashAsync(10, req.body.password, (error, hashedPass) => {
    if (error) {
      return res.status(200).send({
        statusText: 'Internal error'
      });
    }

    data.password = hashedPass;

    service.user.saveUser(data, (error, result) => {
      if (error) {
        return res.status(200).send({
          statusText: 'Internal error'
        });
      }

      return res.send({statusText: ''});
    });

  });
};
