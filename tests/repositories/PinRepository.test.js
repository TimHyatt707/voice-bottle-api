process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const PinRepository = require('../../repositories/PinRepository');

describe('PinRepository', () => {
  const db = knex({ client: 'pg' });
  let pinRepository = null;
  let knexTracker = null;

  beforeAll(() => {
    KnexMock.mock(db);
    pinRepository = new PinRepository({
      db,
    });
  });

  beforeEach(() => {
    knexTracker = KnexMock.getTracker();
    knexTracker.install();
  });

  describe('create a pin', () => {
    it('should create a pin', async () => {
      const pin = {
        user_id: 1,
        voice_message: 'coolurl.com',
        coordinates: '37.7876012,-122.3976428',
        name: 'cool',
      };

      const expectedEntity = Object.assign({}, pin, { id: 1 });

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('insert');
        query.response([expectedEntity]);
      });

      const actualEntity = await pinRepository.create(pin);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('get pins by location', () => {
    it('should get pins by location', async () => {
      const coordinates = '37.7876012,-122.3966428';

      const expectedEntity = [
        {
          id: 1,
          user_id: 1,
          voice_message: 'coolurl.com',
          coordinates: '37.7876012,-122.3976428',
          name: 'cool',
        },
      ];

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response(expectedEntity);
      });

      const actualEntity = await pinRepository.getByLocation(coordinates);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('get by user', () => {
    it('should get pins by location', async () => {
      const userId = 1;

      const expectedEntity = [
        {
          id: 1,
          user_id: 1,
          voice_message: 'coolurl.com',
          coordinates: '37.7876012,-122.3976428',
          name: 'cool',
        },
      ];

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response(expectedEntity);
      });

      const actualEntity = await pinRepository.getByUser(userId);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('get by id', () => {
    it('get a pin by its id', async () => {
      const pinId = 1;

      const expectedEntity = [
        {
          id: 1,
          user_id: 1,
          voice_message: 'coolurl.com',
          coordinates: '37.7876012,-122.3976428',
          name: 'cool',
        },
      ];

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('select');
        query.response([expectedEntity]);
      });

      const actualEntity = await pinRepository.getById(pinId);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('update a pin', () => {
    it('should update a pin by id', async () => {
      const pinId = 1;

      const changes = { voice_message: 'coolerurl.com' };

      const expectedEntity = [
        {
          id: 1,
          user_id: 1,
          voice_message: 'coolerurl.com',
          coordinates: '37.7876012,-122.3976428',
          name: 'cool',
        },
      ];

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('update');
        query.response([expectedEntity]);
      });

      const actualEntity = await pinRepository.update(pinId, changes);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('delete a pin', () => {
    it('delete a pin by id', async () => {
      const pinId = 1;

      const expectedEntity = [
        {
          id: 1,
          user_id: 1,
          voice_message: 'coolerurl.com',
          coordinates: '37.7876012,-122.3976428',
          name: 'cool',
        },
      ];

      knexTracker.on('query', (query) => {
        expect(query.method).toBe('del');
        query.response([expectedEntity]);
      });

      const actualEntity = await pinRepository.delete(pinId);

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
