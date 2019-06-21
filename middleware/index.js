module.exports = {
  checkUsernameParam: require('./checkUsernameParam.middleware'),
  checkPasswordParam: require('./checkPaswordParam.middleware'),
  checkFullnameParam: require('./checkFullnameParam.middleware'),
  checkIsExistingUser: require('./checkIsExistingUser.middleware'),
  checkLatitudeParam: require('./checkLatitudeParam.middleware'),
  checkLongitudeParam: require('./checkLongitudeParam.middleware'),
  checkRadiusParam: require('./checkRadiusParam.middleware'),
  checkKeywordParam: require('./checkKeywordParam.middleware'),
  checkAuthorizationHeader: require('./checkAuthorizationHeader.middleware'),
  authenticate: require('./authenticate.middleware'),
  cors: require('./cors.middleware')
};
