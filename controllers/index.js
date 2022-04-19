const router = require('express').Router();
//get api and user route controllers
const apiRoutes = require('./api'),
      userRoutes = require ('./user');

//define path for user and api routes
router.use('/api', apiRoutes);
router.use('/', userRoutes)


module.exports = router;