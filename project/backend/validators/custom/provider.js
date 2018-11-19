exports.getErrors = async (rule, field, value) => {
    const mainRuleParts = rule.split(':');
    const ruleName = mainRuleParts[0];
    let parameters = null;
    if (mainRuleParts.length > 1) {
        parameters = mainRuleParts[1].split(',');
    }
    const validator = require('./rules/' + ruleName);

    return await validator.validate(field, value, parameters);
};