const httpStatus = require('http-status');
const { Position } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} positionBody
 * @returns {Promise<User>}
 */
const createPosition = async positionBody => {
    if (await Position.isTitleTaken(positionBody.title)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
    }
    return Position.create(positionBody);
};

module.exports = {
    createPosition
};
