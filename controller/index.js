module.exports = (app) => {
  app.use('/users', require('./user')),
  app.use('/videos', require('./video'))
};
