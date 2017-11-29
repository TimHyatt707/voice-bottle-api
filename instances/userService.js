const UserService = require('../services/UserService');

module.exports = new UserService({
  UserRepository: require('./userRepository'),
});
