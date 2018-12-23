module.exports = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = { message: 'You are authenticated' };
        return;
    }
    await next();
};