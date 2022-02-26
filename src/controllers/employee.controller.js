const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { employeeService } = require('../services');

const createEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body);
    res.status(httpStatus.CREATED).send(employee);
});

const getEmployeeByPosition = catchAsync(async (req, res) => {
    res.status(httpStatus.FOUND).send('route found');
});

module.exports = {
    createEmployee,
    getEmployeeByPosition
};
