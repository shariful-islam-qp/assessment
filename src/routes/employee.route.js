const express = require('express');
const router = express.Router();

const validate = require('./../middlewares/validate');
const { protectRoute } = require('./../middlewares/auth.middleware');
const employeeValidator = require('./../validations/employee.validation');
const {
    createEmployee,
    getEmployeeByPosition
} = require('./../controllers/employee.controller');

router
    .route('/')
    .post(validate(employeeValidator.createEmployee), createEmployee);

router.route('/positions/:positionId').get(getEmployeeByPosition);
router
    .route('/positions/private/:positionId')
    .get(protectRoute, getEmployeeByPosition);

module.exports = router;
