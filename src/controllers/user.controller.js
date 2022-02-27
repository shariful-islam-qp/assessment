const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');
const logger = require('./../config/logger');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    logger.info('New user created successfully!');

    const tokens = await tokenService.generateAuthTokens(user);
    logger.info('New token generated!');
    res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
    createUser
};
