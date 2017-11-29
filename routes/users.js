const express = require('express');

const Boom = require('boom');

const router = express.Router();

const usersController = require('../instances/usersController');

router.get('/users/:userid(\\d+)/pins', usersController.getPinsByUser);

router.get('/users/:userid(\\d+)/pins', usersController.getPinsByUser);

router.post('/signup', usersController.createUser);
router.post('/users/:userid(\\d+)/pins', usersController.createPin);

router.patch('/users/:userid(\\d+)', usersController.updateUser);

router.all('/users', (next) => {
  next(Boom.Method('That method is not allowed'));
});

module.exports = router;
