/**
 * Cors handle request
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With');

  next();
};
