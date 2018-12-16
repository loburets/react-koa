const Router = require('koa-router');
const usersController = require('./controllers/users');
const authController = require('./controllers/auth');
const usersValidator = require('./validators/users');
const router = new Router({
    prefix: '/api/v1'
});

router.get('/me', usersController.getMe);
router.get('/user', usersController.getUser);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersValidator.createUser, usersController.createUser);

// todo add validation for login
router.post('/login', usersValidator.login, authController.login);
router.post('/logout', authController.logout);

module.exports = router;