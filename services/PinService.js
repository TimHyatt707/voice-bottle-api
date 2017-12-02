const secret = require('../env');
const jwt = require('jsonwebtoken');

class PinService {
  constructor({ PinRepository }) {
    this.pinRepository = PinRepository;
    this.errorHandler = this.errorHandler.bind(this);
    this.getPinsByUser = this.getPinsByUser.bind(this);
    this.getPinsByLocation = this.getPinsByLocation.bind(this);
    this.createPin = this.createPin.bind(this);
    this.updatePin = this.updatePin.bind(this);
    this.deletePin = this.deletePin.bind(this);
  }
  async getPinsByUser(token) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad request');
      const id = authentication.sub;
      const pins = await this.pinRepository.getByUser(id);
      return pins;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async getPinsByLocation(coordinates) {
    try {
      const pins = this.pinRepository.getByLocation(coordinates);
      return pins;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async createPin(token, data) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad token');
      const id = authentication.sub;
      data.user_id = id;
      const pin = await this.pinRepository.create(data);
      return pin;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async updatePin(token, pinid, changes) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad token');
      const pinVerification = await this.pinRepository.getById(pinid);
      if (pinVerification.user_id !== authentication.sub) throw new Error('Bad token');
      const pin = await this.pinRepository.update(pinid, changes);
      return pin;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async deletePin(token, pinid) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (authentication) throw new Error('Bad token');
      const pinVerification = await this.pinRepository.getById(pinid);
      if (pinVerification.user_id !== authentication.sub) throw new Error('Bad token');
      const pin = await this.pinRepository.delete(pinid);
      return pin;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  errorHandler(error) {
    switch (error.message) {
      case 'Bad token':
        return 'Bad token';
      case 'Bad request':
        return 'Bad request';
      case 'Pin not found':
        return 'Pin not found';
      default:
        return 'Something went wrong';
    }
  }
}

module.exports = PinService;
