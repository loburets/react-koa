const Router = require('koa-router');
const usersController = require('./controllers/users');
const usersValidator = require('./validators/users');
const router = new Router();
const validate = require('koa2-validation');

router.get('/user', usersController.getUser);
router.get('/users/:id', usersController.getUser);
router.post('/users', validate(usersValidator.createUser), usersController.createUser);

module.exports = router;