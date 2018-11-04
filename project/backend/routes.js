const Router = require('koa-router');
const usersController = require('./controllers/users');
const router = new Router();

router.get('/user', usersController.getUser);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.createUser);

module.exports = router;