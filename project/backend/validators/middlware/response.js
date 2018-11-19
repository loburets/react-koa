module.exports = function setErrorResponse(errors, ctx) {
    let data = errors.map((error) => {
        return {
            message: error.message.replace(/"/g, ''),
            field: error.path,
            type: error.type
        }
    });

    ctx.status = 422;
    ctx.body = data;
};