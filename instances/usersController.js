const UsersController = require('../controllers/UsersController');

module.exports = new UsersController({
  UserService: require('./userService'),
  PinService: require('./pinService'),
});
