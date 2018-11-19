const db = require('../../../models');

exports.validate = async (field, value, parameters) => {
    const errors = [];
    const modelName = parameters[0].charAt(0).toUpperCase() + parameters[0].slice(1);
    const modelField = parameters[1];
    const user = await db[modelName].findOne({where: {[modelField]: value}});

    if (user) {
        errors.push({
            message: 'The ' + field + ' is aldready taken.',
            field: field,
            type: 'unique'
        });
    }

    return errors;
};