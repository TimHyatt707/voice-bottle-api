class UsersController {
  constructor({ UserService, PinService }) {
    this.userService = UserService;
    this.pinService = PinService;
    this.errorHandler = this.errorHandler.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getPinsByUser = this.getPinsByUser.bind(this);
    this.createPin = this.createPin.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async getPinsByUser(req, res) {
    try {
      const token = req.get('Authorization');
      const pins = await this.pinService.getPinsByUser(token);
      res.json(pins);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }

  async createPin(req, res) {
    try {
      console.log(req.body);
      const token = req.get('Authorization');
      const pin = await this.pinService.createPin(token, req.body);
      res.json(pin);
    } catch (error) {
      console.log(error.message);
      res.sendStatus(this.errorHandler(error));
    }
  }
  async updateUser(req, res) {
    try {
      const token = req.get('Authorization');
      const user = await this.userService.updateUser(token, req.body);
      res.json(user);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }
  errorHandler(error) {
    switch (error.message) {
      case 'Bad request':
        return 400;
      case 'Bad token':
        return 401;
      case 'Username/email already exists':
        return 400;
      case 'User not found':
        return 404;
      case 'Pin not found':
        return 404;
      default:
        return 500;
    }
  }
}

module.exports = UsersController;
