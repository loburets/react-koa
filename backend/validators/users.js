const Joi = require('joi');
const validator = require('./middlware');

exports.createUser = validator({
    body: {
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: [
            Joi.string().email({ minDomainAtoms: 2 }).required(),
            'unique:user,email'
        ],
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    },
});

exports.login = validator({
    body: {
        email: Joi.required(),
        password: Joi.required(),
    },
});