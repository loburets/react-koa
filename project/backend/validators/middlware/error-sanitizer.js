exports.processJoiErrors = function processJoiErrors(joiErrors) {
    const errors = [];
    const requiredValidationType = 'any.empty';
    // filter other errors of a field if the field has empty value
    joiErrors = joiErrors.filter((joiError) => {
        let requiredErrorExistsForThisField = !!joiErrors.find(function (anotherError) {
            return anotherError.type === requiredValidationType
                && anotherError.path[0] === joiError.path[0];
        });

        return joiError.type === requiredValidationType || !requiredErrorExistsForThisField;
    });

    joiErrors.forEach(function (error) {
        errors.push({
            message: error.message,
            field: error.path[0],
            type: error.type
        });
    });

    return errors;
};