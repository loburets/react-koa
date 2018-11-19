const getErrors = require('./validaton');
const setErrorResponse = require('./response')

module.exports = (schema = {}) => {
    return async (ctx, next) => {
        let errors = getErrors(ctx, next, schema);

        if (errors.length === 0) {
            await next();
            return;
        }

        setErrorResponse(errors, ctx);
    };
};