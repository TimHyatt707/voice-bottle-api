process.env.NODE_ENV = 'test';
const server = require('../../server');
const knex = require('../../knex');

const chai = require('chai');

const { expect } = chai;

const request = require('supertest')(server);

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2b2ljZS1ib3R0bGUiLCJpYXQiOjE1MTIxNTY2MzQsImV4cCI6MTU0MzY5MjYyNCwiYXVkIjoidm9pY2UtYm90dGxlIiwic3ViIjoiMSJ9.ecYLZu3ZKhYV_As2iIqVMssvA29z6aGr_IoayTyq5d0';

describe('User tests', () => {
  before(() => knex.migrate.latest());
  beforeEach(() => {
    knex.seed.run();
  });
  describe('users - get pins', () => {
    it('return the pins from a user', (done) => {
      request
        .get('/users/1/pins')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
  // describe('users - get pins 404', () => {
  //   it('return a 404 if bad id', (done) => {
  //     request
  //       .get('/users/3/pins')
  //       .set('Authorization', token)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.equal(404);
  //         done();
  //       });
  //   });
  // });
  describe('users - create a user', () => {
    it('create', (done) => {
      request
        .post('/signup')
        .send({
          email: 'bestemail4ever@gmail.com',
          username: 'alltimebestusername',
          password: 'pass',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.email).to.equal('bestemail4ever@gmail.com');
          done();
        });
    });
  });
  // describe('users - update a user', () => {
  //   it('update', (done) => {
  //     request
  //       .patch('/users/1')
  //       .send({
  //         email: 'bestemail5ever@gmail.com',
  //       })
  //       .end((err, res) => {
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body.email).to.equal('bestemail5ever@gmail.com');
  //         done();
  //       });
  //   });
  // });
  after(() => {
    knex.migrate.rollback();
  });
});
