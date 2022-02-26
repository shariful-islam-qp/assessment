const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const positionRoute = require('./position.route');
const employeeRoute = require('./employee.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/positions',
        route: positionRoute
    },
    {
        path: '/employees',
        route: employeeRoute
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;
