const { expect } = require('chai');
const supertest = require('supertest');
const resources = require('../src/resources/resources-router');

describe('Resources-Router', () => {
  it('GET / responds with 200', () => {
    return supertest(resources)
      .get('/')
      .expect(200);
  });
});

global.expect = expect;
global.supertest = supertest;