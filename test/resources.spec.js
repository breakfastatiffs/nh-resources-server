const { expect } = require('chai');
const knex = require('knex')
const ResourcesService = require('../src/resources/resources-service');

describe('Resources service object', () => {
 
  const testResources = [
      {
        id: 1,
        category: 'Veterans',
        title: 'Veterans Count',
        phone_number: 6036213570,
        url: 'https://vetscount.org/',
        street: '555 Auburn St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/VeteransCount',
        twitter: 'https://twitter.com/VeteransCount',
        instagram: 'https://www.instagram.com/veteranscount/',
      },
      {
        id: 2,
        category: 'Residence Challenged',
        title: 'Families in Transition',
        phone_number: 6036419441,
        url: 'https://www.fitnh.org/',
        street: '122 Market St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/fitnh/',
        twitter: 'https://twitter.com/FITNH',
        instagram: '',
      },
      {
        id: 3,
        category: 'Mental Health',
        title: 'The Mental Health Center of Greater Manchester',
        phone_number: 6036884111,
        url: 'https://www.mhcgm.org/',
        street: '401 Cypress St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/MentalHealthCenterNH/',
        twitter: 'https://twitter.com/MentalHealthNH',
        instagram: 'https://www.instagram.com/mhcgm/',
      },
    ];

  let db 

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/nh-sources-test',
    });
  });

  // before('clean db', () => db('resources').truncate());

  afterEach('clean db', () => db('resources').truncate());

  after('destroy db connection', () => db.destroy());

  describe('getAllResources()', () => {
    it('returns an empty array', () => {
      return ResourcesService
        .getAllResources(db)
        .then(resources => expect(resources).to.eql([]));
    });

    context('with data present', () => {
      beforeEach('insert test resources', () =>
        db('resources')
          .insert(testResources)
      );

      it('returns all test resources', () => {
        return ResourcesService
          .getAllResources(db)
          .then(resources => expect(resources).to.eql(testResources));
      });
    });
  });

  describe('insertResource()' , () => {
    it('inserts record in db and returns resource with new id', () => {
      const newResource = {
        id: 1,
        category: 'Veterans',
        title: 'Veterans Count',
        phone_number: 6036213570,
        url: 'https://vetscount.org/',
        street: '555 Auburn St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/VeteransCount',
        twitter: 'https://twitter.com/VeteransCount',
        instagram: 'https://www.instagram.com/veteranscount/',
      };

      return ResourcesService.insertResource(db, newResource)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            category: 'Veterans',
            title: 'Veterans Count',
            phone_number: 6036213570,
            url: 'https://vetscount.org/',
            street: '555 Auburn St',
            city: 'Manchester',
            county: 'Hillsborough',
            zip_code: 03103,
            state: 'NH',
            facebook: 'https://www.facebook.com/VeteransCount',
            twitter: 'https://twitter.com/VeteransCount',
            instagram: 'https://www.instagram.com/veteranscount/',
          });
        });
    });


    it('throws not-null constraint error if pet not provided', () => {      
      const newResource = {
        id: 1,
        category: 'Veterans',
        title: 'Veterans Count',
        phone_number: 6036213570,
        url: 'https://vetscount.org/',
        street: '555 Auburn St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/VeteransCount',
        twitter: 'https://twitter.com/VeteransCount',
        instagram: 'https://www.instagram.com/veteranscount/',
      };


      return ResourcesService 
        .insertResource(db, newResource)
        .then(
          () => expect.fail('db should throw error'),
          err => expect(err.message).to.include('not-null')
        );
    });
  });

  describe('getById()', () => {
    it('should return undefined', () => {
      return ResourcesService
        .getById(db, 999)
        .then(resource => expect(resource).to.be.undefined);
    });

    context('with data present', () => {
      before('insert resources', () => 
        db('resources')
          .insert(testResources)
      );

      it('should return existing resource', () => {
        const expectedResourceId = 3;
        const expectedResource = testResources.find(a => a.id === expectedResourceId);
        return ResourcesService.getById(db, expectedResourceId)
          .then(actual => expect(actual).to.eql(expectedResource));
      });
    });
  });

  describe('deleteResource()', () => {
    it('should return 0 rows affected', () => {
      return ResourcesService
        .deleteResource(db, 999)
        .then(rowsAffected => expect(rowsAffected).to.eq(0));
    });

    context('with data present', () => {
      before('insert resources', () => 
        db('resources')
          .insert(testResources)
      );

      it('should return 1 row affected and record is removed from db', () => {
        const deleteResourceId = 1;

        return ResourcesService
          .deleteResource(db, deleteResourceId)
          .then(rowsAffected => {
            expect(rowsAffected).to.eq(1);
            return db('resources').select('*');
          })
          .then(actual => {
            const expected = testResources.filter(a => a.id !== deleteResourceId);
            expect(actual).to.eql(expected);
          });
      });
    });
  });
});