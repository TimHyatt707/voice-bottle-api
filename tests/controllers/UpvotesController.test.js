const HttpMock = require('node-mocks-http');
const UpvotesController = require('../../controllers/UpvotesController');

describe('UpvotesController', () => {
  const UpvoteService = {
    createUpvote: jest.fn(),
    deleteUpvote: jest.fn(),
  };

  const upvotesController = new UpvotesController({ UpvoteService });

  describe('createUpvote', () => {
    it('should create an upvote', async () => {
      const expectedResponse = { id: 0, pin_id: 1, user_id: 1 };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: { pin_id: 2, user_id: 1 } });

      UpvoteService.createUpvote.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await upvotesController.createUpvote(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 404 if pin is not found', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'POST',
        body: { pind_id: 9001, user_id: 1 },
      });

      const error = new Error('Upvote not found');

      UpvoteService.createUpvote.mockReturnValueOnce(Promise.reject(error));

      await upvotesController.createUpvote(request, response);

      expect(response._getStatusCode()).toBe(404);
    });
  });
  describe('deleteUpvote', () => {
    it('should create an upvote', async () => {
      const expectedResponse = { id: 0, pin_id: 1, user_id: 1 };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'DELETE', body: { id: 0 } });

      UpvoteService.deleteUpvote.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await upvotesController.deleteUpvote(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 404 if pin is not found', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'Delete',
        body: { pind_id: 9001, user_id: 1 },
      });

      const error = new Error('Upvote not found');

      UpvoteService.deleteUpvote.mockReturnValueOnce(Promise.reject(error));

      await upvotesController.deleteUpvote(request, response);

      expect(response._getStatusCode()).toBe(404);
    });
  });
});
