const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { positionService } = require('../services');
const logger = require('./../config/logger');

const createPosition = catchAsync(async (req, res) => {
    const position = await positionService.createPosition(req.body);
    logger.info('new position created successfully');
    res.status(httpStatus.CREATED).send(position);
});

const getPositions = catchAsync(async (req, res) => {
    const positions = await positionService.getAllPosition();
    const hierarchy = await positionService.generateHierarchy(positions);

    res.send(hierarchy);
});

// controller to search in position
const searchPosition = catchAsync(async (req, res) => {
    const { searchBy } = req.params;
    const positions = await positionService.searchPosition(searchBy);
    console.log('positions', positions);
    res.send(positions);
});

module.exports = {
    createPosition,
    getPositions,
    searchPosition
};
