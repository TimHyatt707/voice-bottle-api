const express = require('express');

const Boom = require('boom');

const router = express.Router();

const upvotesController = require('../instances/upvotesController');

router.post('/upvotes', upvotesController.createUpvote);

router.delete('/upvotes/:upvotedid(\\d+)', upvotesController.deleteUpvote);

router.all('/upvotes', (next) => {
  next(Boom.Method('That method is not allowed'));
});

module.exports = router;
