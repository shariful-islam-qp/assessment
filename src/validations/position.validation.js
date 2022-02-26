const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// const { password, objectId } = require('./custom.validation');

const createPosition = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        parentId: Joi.objectId()
    })
};

module.exports = {
    createPosition
};
