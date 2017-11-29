const HttpMock = require('node-mocks-http');
const AuthenticationController = require('../../controllers/AuthenticationController');

describe('AuthenticationController', () => {
  const AuthenticationService = {
    authenticate: jest.fn(),
  };

  const authenticationController = new AuthenticationController({
    AuthenticationService,
  });

  describe('Login user', () => {
    it('should login user if given correct credentials', async () => {
      const credentials = {
        username: 'johndoe123',
        password: 'password',
      };

      const expectedResponse = { token: 'jwej31jnofhijo23jnb43' };
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: credentials });

      AuthenticationService.authenticate.mockReturnValueOnce(Promise.resolve(expectedResponse));

      await authenticationController.login(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it('should return a 400 if given incorrect credentials', async () => {
      const credentials = {
        username: 'johndoe123',
        password: 'wrong password',
      };
      const response = HttpMock.createResponse();
      const request = HttpMock.createRequest({ method: 'POST', body: credentials });

      const error = new Error('Invalid username/password');

      AuthenticationService.authenticate.mockReturnValueOnce(Promise.reject(error));

      await authenticationController.login(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });
});
