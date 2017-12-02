class PinsController {
  constructor({ PinService, UpvoteService }) {
    this.pinService = PinService;
    this.upvoteService = UpvoteService;
    this.errorHandler = this.errorHandler.bind(this);
    this.getPinsByLocation = this.getPinsByLocation.bind(this);
    this.getUpvotes = this.getUpvotes.bind(this);
    this.updatePin = this.updatePin.bind(this);
    this.deletePin = this.deletePin.bind(this);
  }

  async getPinsByLocation(req, res) {
    try {
      const pins = await this.pinService.getPinsByLocation(req.body);
      res.json(pins);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }

  async getUpvotes(req, res) {
    try {
      const pin = ~~req.params.pinid;
      const upvotes = await this.upvoteService.getUpvotes(pin);
      res.json(upvotes);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }

  async updatePin(req, res) {
    try {
      const pinid = ~~req.params.pinid;
      const token = req.get('Authorization');
      const pin = await this.pinService.updatePin(token, pinid, req.body);
      res.json(pin);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }

  async deletePin(req, res) {
    try {
      const pinid = ~~req.params.pinid;
      const token = req.get('Authorization');
      const pin = await this.pinService.deletePin(token, pinid);
      res.json(pin);
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
      case 'Pin not found':
        return 404;
      default:
        return 500;
    }
  }
}

module.exports = PinsController;
