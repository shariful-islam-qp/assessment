const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { employeeService, positionService } = require("../services");
const logger = require("./../config/logger");

const createEmployee = catchAsync(async (req, res) => {
	const employee = await employeeService.createEmployee(req.body);
	logger.info("New employee created");
	res.status(httpStatus.CREATED).send(employee);
});

const getAllEmployee = catchAsync(async (req, res) => {
	const employees = await employeeService.getAllEmployee();
	res.status(httpStatus.OK).send(employees);
});

const getEmployeeByPosition = catchAsync(async (req, res) => {
	const positionId = req.params.positionId;
	const docs = await positionService.getAllPositionByRoot(positionId);
	console.log({ docs });
	const positionList = docs[0].result;

	if (positionList && positionList.length > 0) {
		const employees = await employeeService.getEmployeeByPositions(
			positionList
		);
		res.status(httpStatus.OK).send(employees);
	} else
		res
			.status(httpStatus.OK)
			.send(`No Position found under '${positionId}' id`);
});

module.exports = {
	createEmployee,
	getAllEmployee,
	getEmployeeByPosition,
};
