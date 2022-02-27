const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const httpStatus = require('http-status');
const catchAsync = require('./../utils/catchAsync');
const ApiError = require('./../utils/ApiError');
const config = require('./../config/config');
const { getUserById } = require('./../services/user.service');

const protectRoute = catchAsync(async (req, res, next) => {
    // 1) check if token exist
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
        token = req.headers.authorization.split(' ')[1];

    if (!token)
        return next(
            new ApiError(
                httpStatus.UNAUTHORIZED,
                'You are not logged in. Please login to get access'
            )
        );

    // 2) token verification
    const decode = await promisify(jwt.verify)(token, config.JWT_SECRET);

    // 3) Check if user still exist or deleted after token issued
    const decodedUser = await getUserById(decode?.sub);
    if (!decodedUser)
        return next(
            new ApiError(
                httpStatus.UNAUTHORIZED,
                'The user belonging to this token is no longer exist.'
            )
        );

    // 4) check if user changed password after token issued
    if (decodedUser.changedPasswordAfterToken(decode.iat))
        return next(
            new ApiError(
                httpStatus.UNAUTHORIZED,
                'Your password has been changed recently. Please login again'
            )
        );

    // Grant access to protected route
    req.user = decodedUser;
    next();
});

module.exports = { protectRoute };
