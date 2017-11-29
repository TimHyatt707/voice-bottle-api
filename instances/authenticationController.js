const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = new AuthenticationController({
  AuthenticationService: require('./authenticationService'),
});
