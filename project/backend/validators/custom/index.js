const rulesProvider = require ('./provider');

exports.validate = async (toValidateObj, schema) => {
    // to have the same format as joi:
    let result = {
        error: null
    };
    let errors = [];

    for (let field in toValidateObj) {
        if (!toValidateObj.hasOwnProperty(field)) {
            continue;
        }
        if (!schema.hasOwnProperty(field)) {
            continue;
        }
        for (let index = 0; index < schema[field].length; index++) {
            let rule = schema[field][index];
            if (typeof rule === 'undefined') {
                continue;
            }
            let fieldErrors = await rulesProvider.getErrors(rule, field, toValidateObj[field]);
            errors.push(...fieldErrors);
        }
    }

    if (errors.length !== 0) {
        result.error = {};
        result.error.details = errors;
    }

    return result;
};