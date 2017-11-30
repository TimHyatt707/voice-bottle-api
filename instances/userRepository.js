const UserRepository = require('../repositories/UserRepository');

module.exports = new UserRepository({
  db: require('./defaultDatabase'),
});
