const Router = require('koa-router');
const usersController = require('./controllers/users');
const router = new Router();

router.get('/user', usersController.getUser);

module.exports = router;