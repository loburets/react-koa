module.exports = (errors, ctx) => {
    let data = errors.map((error) => {
        return {
            message: error.message,
            field: error.field,
            type: error.type
        }
    });

    ctx.status = 422;
    ctx.body = data;
};