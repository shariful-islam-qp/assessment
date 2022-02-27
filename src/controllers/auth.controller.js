const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('./../services');
const logger = require('./../config/logger');

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    logger.info('token created successfully');
    res.send({
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user?.lastName
        },
        tokens
    });
});

module.exports = {
    login
};
