const PinsController = require('../controllers/PinsController');

module.exports = new PinsController({
  PinService: require('./pinService'),
  UpvoteService: require('./upvoteService'),
});
