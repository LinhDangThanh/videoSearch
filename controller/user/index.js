const express = require('express');
const middleware = require('../../middleware');

const router = express.Router();

router.post('/',
  middleware.checkUsernameParam,
  middleware.checkPasswordParam,
  middleware.checkFullnameParam,
  middleware.checkIsExistingUser,
  require('./registerUser.controller'));

module.exports = router;
