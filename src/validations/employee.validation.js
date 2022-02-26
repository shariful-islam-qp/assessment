const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createEmployee = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        email: Joi.string().required().email(),
        positionId: Joi.objectId().required()
    })
};

module.exports = {
    createEmployee
};
