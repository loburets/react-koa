class FormHelper {
    static getInputErrors (name, errors) {
        let result = [];

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