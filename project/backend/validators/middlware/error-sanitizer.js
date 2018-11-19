exports.processJoiErrors = function processJoiErrors(result) {
    const errors = [];
    const requiredValidationType = 'any.empty';
    // filter other errors of a field if the field has empty value
    const joiErrors = result.error.details.filter((joiError) => {
        let requiredErrorExistsForThisField = !!result.error.details.find(function (anotherError) {
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