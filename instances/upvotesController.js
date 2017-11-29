const UpvotesController = require('../controllers/UpvotesController');

module.exports = new UpvotesController({
  UpvoteService: require('./upvoteService'),
});
