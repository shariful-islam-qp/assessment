const express = require('express');
const router = express.Router();

const positionValidation = require('./../validations/position.validation');
const positionController = require('./../controllers/position.controller');

router.route('/').post(positionController.createPosition);

module.exports = router;