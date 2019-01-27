class FormHelper {
    static getInputErrors (name, errors) {
        const result = [];

        errors.forEach((error) => {
            if (error.input !== name) {
                return;
            }
            result.push(error);
        });

        return result;
    }
}

export default FormHelper;