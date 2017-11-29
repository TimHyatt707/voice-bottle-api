const HttpMock = require('node-mocks-http');
const PinsController = require('../../controllers/PinsController');

describe('PinsController', () => {
  const PinService = {
    getPinsByLocation: jest.fn(),
    updatePin: jest.fn(),
    deletePin: jest.fn(),
  };

  const UpvoteService = {
    getUpvotes: jest.fn(),
  };

  const pinsController = new PinsController({ PinService, UpvoteService });

  describe('getPinsByLocation', () => {
    it('should get pins by location', async () => {
      const expectedResponse = [{ 0: 'data' }, { 1: 'data' }];

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'GET', body: { coordinates: 'sdsdsds' } });

      PinService.getPinsByLocation.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await pinsController.getPinsByLocation(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('return a 400 on bad request', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'GET', body: { coordinates: 'sdsdsds' } });

      const error = new Error('Bad request');

      PinService.getPinsByLocation.mockReturnValueOnce(Promise.reject(error));

      await pinsController.getPinsByLocation(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
  describe('getUpvotes', () => {
    it('should get upvotes', async () => {
      const expectedResponse = [{ 0: 'data' }, { 1: 'data' }];

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'GET', body: { pinid: 2 } });

      UpvoteService.getUpvotes.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await pinsController.getUpvotes(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('return a 400 on bad request', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'GET', body: { coordinates: 'sdsdsds' } });

      const error = new Error('Bad request');

      UpvoteService.getUpvotes.mockReturnValueOnce(Promise.reject(error));

      await pinsController.getUpvotes(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
  describe('updatePin', () => {
    it('update a pin', async () => {
      const expectedResponse = { 0: 'data' };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'PATCH', body: { something: 'something' } });

      PinService.updatePin.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await pinsController.updatePin(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('return a 400 on bad request', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'PATCH', body: { coordinates: 'sdsdsds' } });

      const error = new Error('Bad request');

      PinService.updatePin.mockReturnValueOnce(Promise.reject(error));

      await pinsController.updatePin(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
  describe('deletePin', () => {
    it('delete a pin', async () => {
      const expectedResponse = { 0: 'data' };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'DELETE', body: { pinid: 2 } });

      PinService.deletePin.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await pinsController.deletePin(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('return a 400 on bad request', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'DELETE', body: { pinid: 2 } });

      const error = new Error('Bad request');

      PinService.deletePin.mockReturnValueOnce(Promise.reject(error));

      await pinsController.deletePin(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
});
