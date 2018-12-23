module.exports = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = { message: 'You should be unauthenticated to do this' };
        return;
    }
    await next();
};