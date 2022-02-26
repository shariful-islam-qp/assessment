const express = require('express');
const router = express.Router();

const validate = require('./../middlewares/validate');
const employeeValidator = require('./../validations/employee.validation');
const employeeController = require('./../controllers/employee.controller');

router
    .route('/')
    .post(
        validate(employeeValidator.createEmployee),
        employeeController.createEmployee
    );
// .get(employeeController.getPositions);

module.exports = router;
