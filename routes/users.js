const express = require('express');

const Boom = require('boom');

const router = express.Router();

const usersController = require('../instances/usersController');

<<<<<<< HEAD
router.get('/users/:userid(\\d+)/pins', usersController.getPins);
=======
router.get('/users/:userid(\\d+)/pins', usersController.getPinsByUser);
>>>>>>> fb5cf47... Added Controllers

router.post('/signup', usersController.createUser);
router.post('/users/:userid(\\d+)/pins', usersController.createPin);

router.patch('/users/:userid(\\d+)', usersController.updateUser);

router.all('/users', (next) => {
  next(Boom.Method('That method is not allowed'));
});

module.exports = router;
