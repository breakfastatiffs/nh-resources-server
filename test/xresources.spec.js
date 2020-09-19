// const knex = require('knex')
// const fixtures = require('./resources.fixtures')
// const app = require('../src/app')

// describe('Resource Endpoints', () => {
//   let db

//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASES_URL,
//     })
//     app.set('db', db)
//   })

//   after('disconnect from db', () => db.destroy())

//   before('cleanup', () => db('resources').truncate())

//   afterEach('cleanup', () => db('resources').truncate())

//   describe(`Unauthorized requests`, () => {
//     const testResources = fixtures.makeResourcesArray()

//     beforeEach('insert resources', () => {
//       return db
//         .into('resources')
//         .insert(testResources)
//     })

//   //   it(`responds with 401 Unauthorized for GET /api/resources`, () => {
//   //     return supertest(app)
//   //       .get('/api/resources')
//   //       .expect(401, { error: 'Unauthorized request' })
//   //   })

//   //   it(`responds with 401 Unauthorized for POST /api/resources`, () => {
//   //     return supertest(app)
//   //       .post('/api/resources')
//   //       .send({ title: 'NHSPCA', category: 'Animal Services', phone_number: 5034446666 })
//   //       .expect(401, { error: 'Unauthorized request' })
//   //   })

//   //   it(`responds with 401 Unauthorized for GET /api/resources/:id`, () => {
//   //     const secondResource = testResources[1]
//   //     return supertest(app)
//   //       .get(`/api/resources/${secondResource.id}`)
//   //       .expect(401, { error: 'Unauthorized request' })
//   //   })

//   //   it(`responds with 401 Unauthorized for DELETE /api/resources/:id`, () => {
//   //     const aResource = testResources[1]
//   //     return supertest(app)
//   //       .delete(`/api/resources/${aResource.id}`)
//   //       .expect(401, { error: 'Unauthorized request' })
//   //   })

//   //   it(`responds with 401 Unauthorized for PATCH /api/resources/:id`, () => {
//   //     const aResource = testResources[1]
//   //     return supertest(app)
//   //       .patch(`/api/resources/${aResource.id}`)
//   //       .send({ title: 'updated-title' })
//   //       .expect(401, { error: 'Unauthorized request' })
//   //   })
//   // })

//   describe('GET /api/resources', () => {
//     context(`Given no resources`, () => {
//       it(`responds with 200 and an empty list`, () => {
//         return supertest(app)
//           .get('/api/resources')
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(200, [])
//       })
//     })

//     context('Given there are resources in the database', () => {
//       const testResources = fixtures.makeResourcesArray()

//       beforeEach('insert resources', () => {
//         return db
//           .into('resources')
//           .insert(testResources)
//       })

//       it('gets the resources from the store', () => {
//         return supertest(app)
//           .get('/api/resources')
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(200, testResources)
//       })
//     })

//     context(`Given an XSS attack resources`, () => {
//       const { maliciousResource, expectedResource } = fixtures.makemaliciousResource()

//       beforeEach('insert malicious resource', () => {
//         return db
//           .into('resources')
//           .insert([maliciousResource])
//       })

//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .get(`/api/resources`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body[0].title).to.eql(expectedResource.title)
//             expect(res.body[0].description).to.eql(expectedResource.description)
//           })
//       })
//     })
//   })

//   describe('GET /api/resources/:id', () => {
//     context(`Given no resource`, () => {
//       it(`responds 404 when resource doesn't exist`, () => {
//         return supertest(app)
//           .get(`/api/resources/123`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(404, {
//             error: { message: `Resource Not Found` }
//           })
//       })
//     })

//     context('Given there are resources in the database', () => {
//       const testResources = fixtures.makeResourcesArray()

//       beforeEach('insert resources', () => {
//         return db
//           .into('resources')
//           .insert(testResources)
//       })

//       it('responds with 200 and the specified resource', () => {
//         const resourceId = 2
//         const expectedResource = testResources[resourceId - 1]
//         return supertest(app)
//           .get(`/api/resources/${resourceId}`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(200, expectedResource)
//       })
//     })

//     context(`Given an XSS attack resource`, () => {
//       const { maliciousResource, expectedResource } = fixtures.makemaliciousResource()

//       beforeEach('insert malicious resource', () => {
//         return db
//           .into('resources')
//           .insert([maliciousResource])
//       })

//       it('removes XSS attack content', () => {
//         return supertest(app)
//           .get(`/api/resources/${maliciousResource.id}`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body.title).to.eql(expectedResource.title)
//             // expect(res.body.description).to.eql(expectedResource.description)
//           })
//       })
//     })
//   })

//   describe('DELETE /api/resources/:id', () => {
//     context(`Given no resources`, () => {
//       it(`responds 404 when resource doesn't exist`, () => {
//         return supertest(app)
//           .delete(`/api/resources/123`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(404, {
//             error: { message: `Resource Not Found` }
//           })
//       })
//     })

//     context('Given there are resources in the database', () => {
//       const testResources = fixtures.makeResourcesArray()

//       beforeEach('insert resources', () => {
//         return db
//           .into('resources')
//           .insert(testResources)
//       })

//       it('removes the resource by ID from the store', () => {
//         const idToRemove = 2
//         const expectedResource = testResources.filter(bm => bm.id !== idToRemove)
//         return supertest(app)
//           .delete(`/api/resources/${idToRemove}`)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(204)
//           .then(() =>
//             supertest(app)
//               .get(`/api/resources`)
//               // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//               .expect(expectedResource)
//           )
//       })
//     })
//   })

//   describe('POST /api/resources', () => {
//     ['title', 'category', 'phone_number'].forEach(field => {
//       const newResource = {
//         title: 'test-title',
//         category: 'LGBTQ+',
//         phone_number: 5032226666,
//       }

//       it(`responds with 400 missing '${field}' if not supplied`, () => {
//         delete newResource[field]

//         return supertest(app)
//           .post(`/api/resources`)
//           .send(newResource)
//           // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(400, {
//             error: { message: `'${field}' is required` }
//           })
//       })
//     })

//     // it(`responds with 400 invalid 'rating' if not between 0 and 5`, () => {
//     //   const newBookmarkInvalidRating = {
//     //     title: 'test-title',
//     //     url: 'https://test.com',
//     //     rating: 'invalid',
//     //   }
//     //   return supertest(app)
//     //     .post(`/api/resources`)
//     //     .send(newBookmarkInvalidRating)
//     //     .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//     //     .expect(400, {
//     //       error: { message: `'rating' must be a number between 0 and 5` }
//     //     })
//     // })

//     it(`responds with 400 invalid 'url' if not a valid URL`, () => {
//       const newBookmarkInvalidUrl = {
//         title: 'test-title',
//         url: 'htp://invalid-url',
//         rating: 1,
//       }
//       return supertest(app)
//         .post(`/api/bookmarks`)
//         .send(newBookmarkInvalidUrl)
//         .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//         .expect(400, {
//           error: { message: `'url' must be a valid URL` }
//         })
//     })

//     it('adds a new resource to the store', () => {
//       const newResource = {
//         title: 'test-title',
//         url: 'https://test.com',
//         description: 'test description',
//         rating: 1,
//       }
//       return supertest(app)
//         .post(`/api/resources`)
//         .send(newResource)
//         .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.title).to.eql(newResource.title)
//           expect(res.body.url).to.eql(newResource.url)
//           expect(res.body.description).to.eql(newResource.description)
//           expect(res.body.rating).to.eql(newResource.rating)
//           expect(res.body).to.have.property('id')
//           expect(res.headers.location).to.eql(`/api/resources/${res.body.id}`)
//         })
//         .then(res =>
//           supertest(app)
//             .get(`/api/resources/${res.body.id}`)
//             .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//             .expect(res.body)
//         )
//     })

//     it('removes XSS attack content from response', () => {
//       const { maliciousResource, expectedResource } = fixtures.makemaliciousResource()
//       return supertest(app)
//         .post(`/api/resources`)
//         .send(maliciousResource)
//         .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.title).to.eql(expectedResource.title)
//           expect(res.body.description).to.eql(expectedResource.description)
//         })
//     })
//   })

//   describe(`PATCH /api/resources/:resource_id`, () => {
//     context(`Given no resources`, () => {
//       it(`responds with 404`, () => {
//         const resourceId = 123456
//         return supertest(app)
//           .patch(`/api/resources/${resourceId}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .expect(404, { error: { message: `Resource Not Found` } })
//       })
//     })

//     context('Given there are resources in the database', () => {
//       const testResources = fixtures.makeResourcesArray()

//       beforeEach('insert resources', () => {
//         return db
//           .into('resources')
//           .insert(testResources)
//       })

//       it('responds with 204 and updates the resource', () => {
//         const idToUpdate = 2
//         const updateResource = {
//           title: 'updated resource title',
//           url: 'https://updated-url.com',
//           description: 'updated resource description',
//           rating: 1,
//         }
//         const expectedResource = {
//           ...testResources[idToUpdate - 1],
//           ...updateResource
//         }
//         return supertest(app)
//           .patch(`/api/resources/${idToUpdate}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .send(updateResource)
//           .expect(204)
//           .then(res =>
//             supertest(app)
//               .get(`/api/resources/${idToUpdate}`)
//               .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//               .expect(expectedResource)
//           )
//       })

//       it(`responds with 400 when no required fields supplied`, () => {
//         const idToUpdate = 2
//         return supertest(app)
//           .patch(`/api/resources/${idToUpdate}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .send({ irrelevantField: 'foo' })
//           .expect(400, {
//             error: {
//               message: `Request body must content either 'title', 'url', 'description' or 'rating'`
//             }
//           })
//       })

//       it(`responds with 204 when updating only a subset of fields`, () => {
//         const idToUpdate = 2
//         const updateResource = {
//           title: 'updated resource title',
//         }
//         const expectedResource = {
//           ...testResources[idToUpdate - 1],
//           ...updateResource
//         }

//         return supertest(app)
//           .patch(`/api/resources/${idToUpdate}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .send({
//             ...updateResource,
//             fieldToIgnore: 'should not be in GET response'
//           })
//           .expect(204)
//           .then(res =>
//             supertest(app)
//               .get(`/api/resources/${idToUpdate}`)
//               .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//               .expect(expectedResource)
//           )
//       })

//       it(`responds with 400 invalid 'rating' if not between 0 and 5`, () => {
//         const idToUpdate = 2
//         const updateInvalidRating = {
//           rating: 'invalid',
//         }
//         return supertest(app)
//           .patch(`/api/resources/${idToUpdate}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .send(updateInvalidRating)
//           .expect(400, {
//             error: {
//               message: `'rating' must be a number between 0 and 5`
//             }
//           })
//       })

//       it(`responds with 400 invalid 'url' if not a valid URL`, () => {
//         const idToUpdate = 2
//         const updateInvalidUrl = {
//           url: 'htp://invalid-url',
//         }
//         return supertest(app)
//           .patch(`/api/resources/${idToUpdate}`)
//           .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
//           .send(updateInvalidUrl)
//           .expect(400, {
//             error: {
//               message: `'url' must be a valid URL`
//             }
//           })
//       })
//     })
//   })
// })