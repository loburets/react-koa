module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || err.code;
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
};