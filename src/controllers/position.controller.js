const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { positionService } = require('../services');

const createPosition = catchAsync(async (req, res) => {
    const position = await positionService.createPosition(req.body);
    res.status(httpStatus.CREATED).send(position);
});

const getPositions = catchAsync(async (req, res) => {
    const positions = await positionService.getAllPosition();
    const hierarchy = await positionService.generateHierarchy(positions);

    res.send(hierarchy);
});

// const getUser = catchAsync(async (req, res) => {
//     const user = await userService.getUserById(req.params.userId);
//     if (!user) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }
//     res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//     const user = await userService.updateUserById(req.params.userId, req.body);
//     res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//     await userService.deleteUserById(req.params.userId);
//     res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
    createPosition,
    getPositions
    // getUser,
    // updateUser,
    // deleteUser
};
