class UpvotesController {
  constructor({ UpvoteService }) {
    this.upvoteService = UpvoteService;
    this.errorHandler = this.errorHandler.bind(this);
    this.createUpvote = this.createUpvote.bind(this);
    this.deleteUpvote = this.deleteUpvote.bind(this);
  }
  async createUpvote(req, res) {
    try {
      const token = req.get('Authorization');
      const upvote = await this.upvoteService.createUpvote(token, req.body);
      res.json(upvote);
    } catch (error) {
      res.sendStatus(this.errorHandler(error));
    }
  }
  async deleteUpvote(req, res) {
    try {
      const token = req.get('Authorization');
      const upvote = await this.upvoteService.deleteUpvote(token, ~~req.params.upvoteid);
      res.json(upvote);
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
      case 'Upvote not found':
        return 404;
      default:
        return 500;
    }
  }
}

module.exports = UpvotesController;
