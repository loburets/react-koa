const rulesProvider = require ('./provider');

exports.validate = async (toValidateObj, schema) => {
    // to have the same format as joi:
    let result = {
        error: null
    };
    let errors = [];

    for (let fieldName in toValidateObj) {
        if (!toValidateObj.hasOwnProperty(fieldName)) {
            continue;
        }
        if (!schema.hasOwnProperty(fieldName)) {
            continue;
        }
        let rules = schema[fieldName];
        let value = toValidateObj[fieldName];
        await setErrors(rules, fieldName, value, errors);
    }

    if (errors.length !== 0) {
        result.error = {};
        result.error.details = errors;
    }

    return result;
};

async function setErrors(rules, fieldName, value, errors) {
    for (let index = 0; index < rules.length; index++) {
        let rule = rules[index];
        if (typeof rule === 'undefined') {
            continue;
        }
        let fieldErrors = await rulesProvider.getErrors(rule, fieldName, value);
        errors.push(...fieldErrors);
    }
}