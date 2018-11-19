const _ = require('lodash');
const Joi = require('joi');
const filterJoi = require('./joi-filter');

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

function getErrors(ctx, next, schema) {
    const { opt = {} } = schema;

    const options = _.defaultsDeep(opt, {
        allowUnknown: true,
    });

    const defaultValidateKeys = ['body', 'query', 'params'];
    const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schema));

    const errors = [];
    needValidateKeys.find((item) => {
        const toValidateObj = item === 'body' ? ctx.request.body : ctx[item];
        let joiSchemaForThisItem = filterJoi(schema[item], true);
        const result = Joi.validate(toValidateObj, joiSchemaForThisItem, options);
        if (result.error) {
            errors.push(result.error.details[0]);
            return true;
        }
        _.assignIn(toValidateObj, result.value);
        return false;
    });

    return errors;
}

function setErrorResponse(errors, ctx) {
    let data = errors.map((error) => {
        return {
            message: error.message.replace(/"/g, ''),
            field: error.path[0]
        }
    });

    ctx.status = 422;
    ctx.body = data;
}