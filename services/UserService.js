const bcrypt = require('bcryptjs');
const secret = require('./../env');
const jwt = require('jsonwebtoken');

class UserService {
  constructor({ UserRepository, UserValidator }) {
    this.userRepository = UserRepository;
    this.UserValidator = UserValidator;
    this.errorHandler = this.errorHandler.bind(this);
  }
  async createUser(credentials) {
    try {
      if (!credentials.username || !credentials.password || !credentials.email) {
        throw new Error('Bad request');
      }
      // TODO: ADD validator
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      credentials.hashed_password = hashedPassword;
      const user = await this.userRepository.create(credentials);
      delete user.hashed_password;
      return user;
    } catch (error) {
      throw new Error(this.errorHandler(error));
    }
  }
  async updateUser(token, changes) {
    try {
      const authentication = jwt.verify(token, secret.JWT_KEY);
      if (!authentication) throw new Error('Bad token');
      const id = authentication.sub;
      const verifiedUser = await this.userRepository.getByUserId(id);
      if (!verifiedUser) throw new Error('Bad token');
      const updatedUser = await this.userRepository.update(id, changes);
      delete updatedUser.hashed_password;
      return updatedUser;
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
      case 'User not found':
        return 'User not found';
      default:
        return 'Something went wrong';
    }
  }
}

module.exports = UserService;
