module.exports = async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.status = 401;
        ctx.body = { message: 'Unauthenticated' };
        return;
    }
    await next();
};