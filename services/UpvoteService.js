const secret = require('./../env');
const jwt = require('jsonwebtoken');

class UpvoteService {
  constructor({ UpvoteRepository }) {
    this.upvoteRepository = UpvoteRepository;
    this.errorHandler = this.errorHandler.bind(this);
    this.getUpvotes = this.getUpvotes.bind(this);
    this.createUpvote = this.createUpvote.bind(this);
    this.deleteUpvote = this.deleteUpvote.bind(this);
  }
  async getUpvotes(pinid) {
    try {
      const upvotes = await this.upvoteRepository.getByPinId(pinid);
      if (upvotes.length) throw new Error('Upvote not found');
      return upvotes.length;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async createUpvote(token, data) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad token');
      const upvote = await this.upvoteRepository.create(authentication.sub, data);
      return upvote;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async deleteUpvote(token, upvoteid) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad token');
      const upvote = await this.upvoteRepository.getByUser(authentication.sub);
      if (!upvote) throw new Error('Bad token');
      const deletedUpvote = await this.upvoteRepository.delete(upvoteid);
      return deletedUpvote;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  errorHandler(error) {
    switch (error.message) {
      case 'Bad request':
        return 'Bad request';
      case 'Bad token':
        return 'Bad token';
      case 'Upvote not found':
        return 'Upvote not found';
      default:
        return 'Something went wrong';
    }
  }
}

module.exports = UpvoteService;
