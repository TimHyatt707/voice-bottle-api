process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const UpvoteRepository = require('../../repositories/UpvoteRepository');

describe('UpvoteRepository', () => {
  const db = knex({ client: 'pg' });
  let upvoteRepository = null;
  let knexTracker = null;

  beforeAll(() => {
    KnexMock.mock(db);
    upvoteRepository = new UpvoteRepository({
      db,
    });
  });

  beforeEach(() => {
    knexTracker = KnexMock.getTracker();
    knexTracker.install();
  });

  describe('create an upvote', () => {
    it('should create an upvote', async () => {
      const userId = 1;
      const requestBody = { pinId: 1 };
      const upvote = { user_id: 1, pin_id: 1 };

      const expectedEntity = Object.assign({}, userId, requestBody, { id: 1 });

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('insert');
        query.response([expectedEntity]);
      });

      const actualEntity = await upvoteRepository.create(upvote);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('get upvote id', () => {
    it('get upvote id', async () => {
      const id = 1;

      const expectedEntity = { id: 1, user_id: 1, pin_id: 1 };

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response([expectedEntity]);
      });

      const actualEntity = await upvoteRepository.getByPinId(id);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('delete an upvote', () => {
    it('delete an upvote by id', async () => {
      const id = 1;

      const expectedEntity = { id: 1, user_id: 1, pin_id: 1 };

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('del');
        query.response([expectedEntity]);
      });

      const actualEntity = await upvoteRepository.delete(id);

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
