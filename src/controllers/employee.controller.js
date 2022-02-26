const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { employeeService } = require('../services');

const createEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body);
    res.status(httpStatus.CREATED).send(employee);
});

module.exports = {
    createEmployee
};
