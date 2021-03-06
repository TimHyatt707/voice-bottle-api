const bcrypt = require('bcryptjs');
const secret = require('./../env');
const jwt = require('jsonwebtoken');

class AuthenticationService {
  constructor({ UserRepository }) {
    this.userRepository = UserRepository;
    this.authenticate = this.authenticate.bind(this);
  }
  async authenticate(credentials) {
    try {
      if (!credentials.username || !credentials.password) {
        throw new Error('Invalid username/password');
      }
      const user = await this.userRepository.getByUsername(credentials.username);
      const passwordCheck = await bcrypt.compare(credentials.password, user.hashed_password);
      if (!passwordCheck) {
        throw new Error('Invalid username/password');
      }
      const timeIssued = Math.floor(Date.now() / 1000);
      const token = await jwt.sign(
        {
          iss: 'voice-bottle',
          aud: 'voice-bottle',
          iat: timeIssued,
          sub: user.id,
        },
        secret.JWT_KEY,
      );
      const id = user.id;
      return { token, id };
    } catch (error) {
      if (error.message === 'Invalid username/password') {
        throw new Error('Invalid username/password');
      } else throw new Error('Something went wrong');
    }
  }
}

module.exports = AuthenticationService;
