const bcrypt = require('bcryptjs');
const secret = require('./../env');
const jwt = require('jsonwebtoken');

class UserService {
  constructor({ UserRepository, UserValidator }) {
    this.userRepository = UserRepository;
    this.userValidator = UserValidator;
    this.errorHandler = this.errorHandler.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async createUser(credentials) {
    try {
      if (!credentials.username || !credentials.password || !credentials.email) {
        throw new Error('Bad request');
      }
      const validatedCredentials = await this.userValidator.validate(credentials, 'create');
      const hashedPassword = await bcrypt.hash(validatedCredentials.password, 12);
      delete validatedCredentials.password;
      validatedCredentials.hashed_password = hashedPassword;
      const user = await this.userRepository.create(validatedCredentials);
      delete user.hashed_password;
      return user;
    } catch (error) {
      return Error(this.errorHandler(error));
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
      return this.errorHandler(error);
    }
  }
  errorHandler(error) {
    switch (error.message) {
      case 'Username/email already exists':
        return 'Bad request';
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
