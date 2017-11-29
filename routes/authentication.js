const express = require('express');
const Boom = require('boom');

const router = express.Router();
const authenticationController = require('../instances/authenticationController');

router.post('/login', authenticationController.login);

router.all('/login', next => next(Boom.methodNotAllowed('Method not allowed')));

module.exports = router;
