const httpStatus = require("http-status");
const { Employee } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} employeeBody
 * @returns {Promise<Employee>}
 */
const createEmployee = async (employeeBody) => {
	if (await Employee.isEmailTaken(employeeBody.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	}
	return Employee.create(employeeBody);
};

const getAllEmployee = async () => {
	return Employee.find();
};

/**
 * Create a user
 * @param {Array} positionArray
 * @returns {Promise<Employee>}
 */
const getEmployeeByPositions = async (positionArray) => {
	return Employee.find({ positionId: { $in: positionArray } }).select("-__v");
};

module.exports = { createEmployee, getAllEmployee, getEmployeeByPositions };
