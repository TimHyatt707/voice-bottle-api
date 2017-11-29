const PinService = require('../services/PinService');

module.exports = new PinService({
  PinRepository: require('./pinRepository'),
});
