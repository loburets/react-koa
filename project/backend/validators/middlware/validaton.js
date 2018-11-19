const _ = require('lodash');
const Joi = require('joi');
const filterJoi = require('./joi-filter');
const processJoiErrors = require('./error-sanitizer').processJoiErrors

module.exports = function getErrors(ctx, next, schema) {
    const { opt = {} } = schema;

    const options = _.defaultsDeep(opt, {
        // allowUnknown: true,
        abortEarly: false
    });

    const defaultValidateKeys = ['body', 'query', 'params'];
    const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schema));
    const errors = [];

    needValidateKeys.find((item) => {
        const toValidateObj = item === 'body' ? ctx.request.body : ctx[item];
        let joiSchemaForThisItem = filterJoi(schema[item], true);
        const result = Joi.validate(toValidateObj, joiSchemaForThisItem, options);

        if (!result.error) {
            return;
        }
        errors.push(...processJoiErrors(result));
    });

    return errors;
};