process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const UserRepository = require('../../repositories/UserRepository');

describe('UserRepository', () => {
  const db = knex({ client: 'pg' });
  let userRepository = null;
  let knexTracker = null;

  beforeAll(() => {
    KnexMock.mock(db);
    userRepository = new UserRepository({
      db,
    });
  });

  beforeEach(() => {
    knexTracker = KnexMock.getTracker();
    knexTracker.install();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = {
        email: 'someemail@gmail.com',
        username: 'username1',
        password: 'password',
      };

      const expectedEntity = Object.assign({}, user, { id: 1 });

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('insert');
        query.response([expectedEntity]);
      });

      const actualEntity = await userRepository.create(user);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });
  describe('get a user by id', () => {
    it('get a user by id', async () => {
      const id = 1;

      const expectedEntity = Object.assign(
        {},
        {
          id: 1,
          email: 'someemail@gmail.com',
          username: 'username1',
          password: 'password',
        },
      );

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response([expectedEntity]);
      });

      const actualEntity = await userRepository.getByUserId(id);

      expect(actualEntity).toEqual(expectedEntity);
    });
    it('return User not found if bad id', async () => {
      const id = 2;

      const expectedEntity = 'User not found';

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response([expectedEntity]);
      });

      const actualEntity = await userRepository.getByUserId(id);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });
  describe('update a user', () => {
    it('update a user', async () => {
      const id = 1;

      const changes = { email: 'coolestemailever@gmail.com' };

      const expectedEntity = Object.assign(
        {},
        {
          id: 1,
          email: 'coolestemailever@gmail.com',
          username: 'username1',
          password: 'password',
        },
      );

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('update');
        query.response([expectedEntity]);
      });

      const actualEntity = await userRepository.update(id, changes);

      expect(actualEntity).toEqual(expectedEntity);
    });
    it('return User not found if bad id', async () => {
      const id = 2;

      const changes = { email: 'coolestemailever@gmail.com' };

      const expectedEntity = 'User not found';

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('update');
        query.response([expectedEntity]);
      });

      const actualEntity = await userRepository.update(id, changes);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });
  afterEach(() => {
    knexTracker.uninstall();
  });

  afterAll(() => {
    KnexMock.unmock(db);
  });
});
