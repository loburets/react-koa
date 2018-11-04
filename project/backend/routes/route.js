const Router = require('koa-router');
const router = new Router();

router.get('/user', (ctx, next) => {
    ctx.body = 'You have got your User!';
    next();
});

module.exports = router;