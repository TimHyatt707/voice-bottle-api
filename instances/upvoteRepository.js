const UpvoteRepository = require('../repositories/UpvoteRepository');

module.exports = new UpvoteRepository({
  db: require('./defaultDatabase'),
});
