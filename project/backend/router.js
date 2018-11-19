const Router = require('koa-router');
const usersController = require('./controllers/users');
const usersValidator = require('./validators/users');
const router = new Router();

router.get('/user', usersController.getUser);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersValidator.createUser, usersController.createUser);

module.exports = router;