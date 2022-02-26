const httpStatus = require('http-status');
const { Employee } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} employeeBody
 * @returns {Promise<Position>}
 */
const createEmployee = async employeeBody => {
    if (await Employee.isEmailTaken(employeeBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return Employee.create(employeeBody);
};

module.exports = { createEmployee };
