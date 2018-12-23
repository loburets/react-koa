const Router = require('koa-router');
const usersController = require('./controllers/users');
const authController = require('./controllers/auth');
const usersValidator = require('./validators/users');
const rejectAuthorized = require('./middlewares/reject-authorized');
const rejectUnauthorized = require('./middlewares/reject-unauthorized');

const baseRouter = new Router({
    prefix: '/api/v1'
});

baseRouter.post('/users', usersValidator.createUser, usersController.createUser);

baseRouter.get('/me', rejectUnauthorized, usersController.getMe);
baseRouter.get('/users/:id', rejectUnauthorized, usersController.getUser);
baseRouter.get('/user', rejectUnauthorized, usersController.getUser);

baseRouter.post('/login', rejectAuthorized, usersValidator.login, authController.login);
baseRouter.post('/logout', rejectAuthorized, authController.logout);

module.exports = baseRouter;