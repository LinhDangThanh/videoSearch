module.exports = {
  checkUsernameParam: require('./checkUsernameParam.middleware'),
  checkPasswordParam: require('./checkPaswordParam.middleware'),
  checkFullnameParam: require('./checkFullnameParam.middleware'),
  checkIsExistingUser: require('./checkIsExistingUser.middleware')
};
