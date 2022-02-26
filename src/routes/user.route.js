const express = require('express');
const router = express.Router();

const validate = require('./../middlewares/validate');
const authValidator = require('./../validations/auth.validation');
const userController = require('./../controllers/user.controller');

router
    .route('/')
    .post(validate(authValidator.createUser), userController.createUser);

module.exports = router;
