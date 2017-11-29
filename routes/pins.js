const express = require('express');

const Boom = require('boom');

const router = express.Router();

const pinsController = require('../instances/pinsController');

router.get('/pins', pinsController.getPinsByLocation);
router.get('/pins/:pinid(\\d+)/upvotes', pinsController.getUpvotes);

router.patch('/pins/:pinid(\\d+)', pinsController.updatePin);

router.delete('/pins/:pinid(\\d+)', pinsController.deletePin);

router.all('/pins', (next) => {
  next(Boom.Method('That method is not allowed'));
});

module.exports = router;
