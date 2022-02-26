const Joi = require('joi');
const { password } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        confirmPassword: Joi.string().required().custom(password)
    })
};

module.exports = {
    createUser
};
