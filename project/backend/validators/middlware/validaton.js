const _ = require('lodash');
const Joi = require('joi');
const filterJoi = require('./joi-filter');
const processJoiErrors = require('./error-sanitizer').processJoiErrors;
const customValidator = require('../custom');

exports.getErrors = async (ctx, next, schema) => {
    const { opt = {} } = schema;

    const options = _.defaultsDeep(opt, {
        abortEarly: false
    });

    const defaultValidateKeys = ['body', 'query', 'params'];
    const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schema));
    const errors = [];

    for (let index = 0; index < needValidateKeys.length; index++) {
        let item = needValidateKeys[index]
        const toValidateObj = item === 'body' ? ctx.request.body : ctx[item];
        // use not all the schema, but only the joi rules
        let joiSchemaForThisItem = filterJoi(schema[item], true);
        const joiValidation = Joi.validate(toValidateObj, joiSchemaForThisItem, options);

        if (joiValidation.error) {
            errors.push(...processJoiErrors(joiValidation.error.details));
        }

        // use not all the schema, but only the custom rules
        let customSchemaForThisItem = filterJoi(schema[item], false);
        const customValidation = await customValidator.validate(toValidateObj, customSchemaForThisItem);
        if (customValidation.error) {
            errors.push(...customValidation.error.details);
        }
    }

    return errors;
};