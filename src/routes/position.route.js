const express = require('express');
const router = express.Router();

const validate = require('./../middlewares/validate');
// const { protectRoute } = require('./../middlewares/auth.middleware');
const positionValidation = require('./../validations/position.validation');
const positionController = require('./../controllers/position.controller');

router
    .route('/')
    .post(
        validate(positionValidation.createPosition),
        positionController.createPosition
    )
    .get(positionController.getPositions);

router.route('/search/:searchBy').post(positionController.searchPosition);

module.exports = router;
