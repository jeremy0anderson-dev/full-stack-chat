const router = require('express').Router();
const auth = require('./login-register');
const home = require('./home');



router.use('/', home);
router.use('/auth', auth);

module.exports = router;