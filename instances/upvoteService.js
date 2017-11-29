const UpvoteService = require('../services/UpvoteService');

module.exports = new UpvoteService({
  UpvoteRepository: require('./upvoteRepository'),
});
