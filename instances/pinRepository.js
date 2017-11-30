const PinRepository = require('../repositories/PinRepository');

module.exports = new PinRepository({
  db: require('./defaultDatabase'),
});
