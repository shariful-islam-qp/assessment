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

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
};

module.exports = {
    createUser,
    login
};
