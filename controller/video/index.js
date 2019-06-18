const express = require('express');

const router = express.Router();
const middleware = require('../../middleware');

router.get('/',
  middleware.checkLatitudeParam,
  middleware.checkLongitudeParam,
  middleware.checkRadiusParam,
  middleware.checkAuthorizationHeader,
  middleware.authenticate,
  require('./searchVideo.controller'));

module.exports = router;
