const AuthenticationService = require('../services/AuthenticationService');

module.exports = new AuthenticationService({
  UserRepository: require('./userRepository'),
});
