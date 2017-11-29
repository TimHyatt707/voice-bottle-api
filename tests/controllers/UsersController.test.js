const HttpMock = require('node-mocks-http');
const UsersController = require('../../controllers/UsersController');

describe('UsersController', () => {
  const UserService = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const PinService = {
    getPinsByUser: jest.fn(),
    createPin: jest.fn(),
  };

  const usersController = new UsersController({ UserService, PinService });

  describe('getPinsByUser', () => {
    it('should return the pins by user', async () => {
      const expectedResponse = [
        { id: 2, voice_message: 'somerecording.com', coordinates: 'something' },
      ];

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        Header: { Authorization: 'km3km334' },
      });

      PinService.getPinsByUser.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await usersController.getPinsByUser(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 401 if bad token', async () => {
      const error = new Error('Bad token');

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        Header: { Authorization: 'km3km334' },
      });

      PinService.getPinsByUser.mockReturnValueOnce(Promise.reject(error));

      await usersController.getPinsByUser(request, response);

      expect(response._getStatusCode()).toBe(401);
    });
    it('should return a 404 if unknown user', async () => {
      const error = new Error('User not found');

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        Header: { Authorization: 'km3km334' },
      });

      PinService.getPinsByUser.mockReturnValueOnce(Promise.reject(error));

      await usersController.getPinsByUser(request, response);

      expect(response._getStatusCode()).toBe(404);
    });
  });
  describe('createPin', () => {
    it('create a pin', async () => {
      const expectedResponse = {
        id: 2,
        voice_message: 'somerecording.com',
        coordinates: 'something',
      };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'POST',
        body: { voice_message: 'somerecording.com', coordinates: 'something' },
      });

      PinService.createPin.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await usersController.createPin(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 400 if bad request', async () => {
      const error = new Error('Bad request');

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        body: null,
      });

      PinService.createPin.mockReturnValueOnce(Promise.reject(error));

      await usersController.createPin(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it('should return a 401 if bad token', async () => {
      const error = new Error('Bad token');

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        Header: { Authorization: 'km3km334' },
      });

      PinService.createPin.mockReturnValueOnce(Promise.reject(error));

      await usersController.createPin(request, response);

      expect(response._getStatusCode()).toBe(401);
    });
    it('should return a 404 if unknown user', async () => {
      const error = new Error('User not found');

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'GET',
        Header: { Authorization: 'km3km334' },
      });

      PinService.createPin.mockReturnValueOnce(Promise.reject(error));

      await usersController.createPin(request, response);

      expect(response._getStatusCode()).toBe(404);
    });
  });
  describe('createUser', () => {
    it('should create a user', async () => {
      const expectedResponse = { id: 1, username: 'johndoe123', email: 'somebody@somewhere.com' };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: expectedResponse });

      UserService.createUser.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await usersController.createUser(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 400 when given bad input', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: null });

      const error = new Error('Bad request');

      UserService.createUser.mockReturnValueOnce(Promise.reject(error));

      await usersController.createUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
  describe('updateUser', () => {
    it('should update a user', async () => {
      const expectedResponse = { id: 1, username: 'johndoe123', email: 'somebody@somewhere.com' };

      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({
        method: 'POST',
        body: { email: 'somebody@somewhere.com' },
      });

      UserService.updateUser.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await usersController.updateUser(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 400 when given bad input', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: null });

      const error = new Error('Bad request');

      UserService.updateUser.mockReturnValueOnce(Promise.reject(error));

      await usersController.updateUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it('should return a 404 when user is not found', async () => {
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: null });

      const error = new Error('User not found');

      UserService.updateUser.mockReturnValueOnce(Promise.reject(error));

      await usersController.updateUser(request, response);

      expect(response._getStatusCode()).toBe(404);
    });
  });
});
