const _ = require('lodash');

module.exports = function filterJoi(toFilter, isJoi) {
    return _.transform(toFilter, (result, value, key) => {
        if (Array.isArray(value)) {
            value = filterJoi(value, isJoi)
        } else if (Boolean(value.isJoi) !== isJoi) {
            return;
        }

        result[key] = value;
    });
};