const Joi = require('joi');

exports.createUser = {
    body: {
        id: Joi.string().required(),
            name: Joi.string(),
            age: Joi.number(),
    },
};