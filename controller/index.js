module.exports = (app) => {
  app.use('/user', require('./user')),
  app.use('/video', require('./video'))
};
