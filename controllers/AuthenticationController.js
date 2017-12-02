class AuthenticationController {
  constructor({ AuthenticationService }) {
    this.authenticationService = AuthenticationService;
    this.login = this.login.bind(this);
  }
  async login(req, res) {
    try {
      const authentication = await this.authenticationService.authenticate(req.body);
      res.json(authentication);
    } catch (error) {
      if (error.message === 'Invalid username/password') res.sendStatus(400);
      else {
        res.sendStatus(500);
      }
    }
  }
}

module.exports = AuthenticationController;
